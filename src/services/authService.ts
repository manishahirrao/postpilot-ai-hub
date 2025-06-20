import { authApi } from '../lib/api';
import { NavigateFunction, Location } from 'react-router-dom';

interface AuthCredentials {
  email: string;
  password: string;
  account_type: 'personal' | 'company';
  profile?: {
    full_name: string;
    headline?: string;
    industry?: string;
    location?: string;
    profile_picture?: string | null;
    linkedin_url?: string;
  };
}

interface AuthResponse {
  status: 'success' | 'error' | 'registered';
  message: string;
  redirect?: string;
  prefill_email?: string;
  data?: {
    token: string;
    user: {
      email: string;
      account_type: 'personal' | 'company';
    }
  };
}

class AuthService {
  // ...existing code...

  // Verify email token and mark user as verified
  public async verifyEmailToken(token: string, email: string): Promise<{ error?: any }> {
    try {
      // Verify the email with the token using supabase
      const { error: verifyError } = await authApi.supabase.auth.verifyOtp({
        email: email.trim(),
        token,
        type: 'signup'
      });
      if (verifyError) {
        return { error: verifyError };
      }
      // Update the user's email_confirmed status in the profiles table
      const { error: updateError } = await authApi.supabase
        .from('profiles')
        .update({ email_confirmed: true })
        .eq('email', email.trim());
      if (updateError) {
        return { error: updateError };
      }
      return {};
    } catch (error) {
      return { error };
    }
  }

  // ...existing code...

  // Check if a user's email is verified
  public async checkVerificationStatus(email: string): Promise<{ data: { verified: boolean }, error?: any }> {
    try {
      // Query the profiles table for the user's email_confirmed status
      const { data, error } = await authApi.supabase
        .from('profiles')
        .select('email_confirmed')
        .eq('email', email.trim())
        .single();
      if (error) {
        return { data: { verified: false }, error };
      }
      return { data: { verified: !!data?.email_confirmed }, error: null };
    } catch (error) {
      return { data: { verified: false }, error };
    }
  }

  private navigate: NavigateFunction | null = null;
  private location: Location | null = null;

  // Method to set router dependencies after instantiation
  setRouterDependencies(navigate: NavigateFunction, location: Location) {
    this.navigate = navigate;
    this.location = location;
  }

  // Helper method to safely navigate
  private safeNavigate(to: string) {
    if (this.navigate) {
      this.navigate(to);
    } else {
      console.warn('Navigation not available. Router dependencies not set.');
      // Fallback to window.location if needed
      window.location.href = to;
    }
  }

  private async checkUserExists(email: string, account_type: 'personal' | 'company'): Promise<boolean> {
    try {
      // Use the admin API to list users with this email
      const { data: { users }, error } = await authApi.supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1
      });

      if (error) {
        console.error('Error listing users:', error);
        return false;
      }

      // Check if any user has the matching email
      const userExists = users.some(user => user.email === email);
      return userExists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  }

  async login(loginCredentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { email, password, account_type } = loginCredentials;
      
      // First, attempt to sign in directly
      const { data, error } = await authApi.signIn({
        email,
        password
      });

      if (error) {
        // If login fails with invalid credentials, check if user exists
        if (error.message?.includes('Invalid login credentials')) {
          const userExists = await this.checkUserExists(email, account_type);
          
          if (!userExists) {
            return {
              status: 'error',
              message: 'No account found with this email.',
              redirect: '/auth/signup'
            };
          }
          
          return {
            status: 'error',
            message: 'Invalid email or password. Please try again.',
          };
        }
        
        // Handle other errors
        return {
          status: 'error',
          message: error.message || 'An error occurred during login.',
        };
      }

      // If we get here, login was successful
      // Now check if the user has a profile
      try {
        const { data: profileData, error: profileError } = await authApi.supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user?.id)
          .single();

        if (profileError || !profileData) {
          console.log('Profile not found, creating one...');
          // Create a profile if it doesn't exist
          const { error: createProfileError } = await authApi.supabase
            .from('profiles')
            .upsert({
              user_id: data.user?.id,
              email: email,
              full_name: data.user?.user_metadata?.full_name || email.split('@')[0],
              account_type,
              email_confirmed: data.user?.email_confirmed_at ? true : false
            }, {
              onConflict: 'user_id'
            });

          if (createProfileError) {
            console.error('Error creating profile:', createProfileError);
            throw createProfileError;
          }
        }
      } catch (profileError) {
        console.error('Error checking/creating profile:', profileError);
        // Continue with login even if profile creation fails
      }

      return {
        status: 'success',
        message: 'Login successful!',
        data: {
          token: data.session?.access_token || '',
          user: {
            email,
            account_type
          }
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message: 'An error occurred during login. Please try again.',
        redirect: null
      };
    }
  }

  async register({
    email,
    password,
    account_type,
    profile
  }: {
    email: string;
    password: string;
    account_type: 'personal' | 'company';
    profile: {
      full_name: string;
      headline?: string;
      industry?: string;
      location?: string;
      profile_picture?: string | null;
      linkedin_url?: string;
    };
  }): Promise<AuthResponse> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          status: 'error',
          message: 'Please enter a valid email address',
          redirect: null
        };
      }

      // Check if user already exists in auth
      const { data: existingProfile } = await authApi.supabase
        .from('profiles')
        .select('user_id, email_confirmed')
        .eq('email', email)
        .maybeSingle();
      
      const userExists = !!existingProfile?.user_id;

      if (userExists) {
        if (existingProfile?.email_confirmed) {
          return {
            status: 'registered',
            message: 'This email is already registered. Please log in instead.',
            redirect: `/auth/login/personal?email=${encodeURIComponent(email)}`,
            prefill_email: email
          };
        } else {
          // User exists but email is not verified
          const { error: verifyError } = await authApi.supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/verify-email`
            }
          });

          if (verifyError) {
            return {
              status: 'error',
              message: 'Failed to resend verification email. Please try again.',
              redirect: null
            };
          }

          return {
            status: 'registered',
            message: 'A verification email has been resent. Please check your inbox.',
            redirect: `/auth/verify-email?email=${encodeURIComponent(email)}`,
            prefill_email: email
          };
        }
      }

      // Register the new user with Supabase Auth
      const { data, error } = await authApi.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: profile.full_name,
            account_type,
            email: email
          },
          emailRedirectTo: `${window.location.origin}/auth/verify-email`
        }
      });

      if (error) {
        return {
          status: 'error',
          message: error.message || 'Registration failed',
          redirect: null
        };
      }

      // Create the user profile
      if (data.user) {
        try {
          const { error: profileError } = await authApi.supabase
            .from('profiles')
            .upsert({
              user_id: data.user.id,
              email: email,
              full_name: profile.full_name,
              headline: profile.headline || null,
              industry: profile.industry || null,
              location: profile.location || null,
              linkedin_url: profile.linkedin_url || null,
              account_type,
              email_confirmed: false
            }, {
              onConflict: 'user_id'
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
            // Don't fail the registration, as the auth user was created successfully
            // The profile can be updated later
          }
        } catch (error) {
          console.error('Error in user profile creation:', error);
          // Continue with registration even if profile creation fails
        }
      }

      // Return success with redirect to verification page
      return {
        status: 'success',
        message: 'Registration successful! Please check your email to verify your account.',
        redirect: `/auth/verify-email?email=${encodeURIComponent(email)}`,
        prefill_email: email
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        status: 'error',
        message: 'An error occurred during registration. Please try again.',
        redirect: null
      };
    }
  }

  async resendVerificationEmail(email: string): Promise<{ error?: { message: string } }> {
    try {
      const { error } = await authApi.supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify-email`
        }
      });

      if (error) {
        console.error('Failed to resend verification email:', error);
        return { error: { message: error.message } };
      }

      return {};
    } catch (error) {
      console.error('Error in resendVerificationEmail:', error);
      return { error: { message: 'An unexpected error occurred' } };
    }
  }

  private async validatePassword(email: string, password: string): Promise<boolean> {
    // This should be implemented securely on the backend
    // For now, we'll mock it
    return true; // In production, this should verify against hashed password
  }

  // Utility method to handle redirects with pre-filled email
  handleRedirect(response: AuthResponse) {
    if (response.redirect) {
      this.navigate(response.redirect, {
        state: response.prefill_email ? { email: response.prefill_email } : undefined
      });
    }

    if (response.status === 'success' && response.redirect === '/dashboard') {
      this.navigate(response.redirect);
    }
  }
}

export { AuthService, type AuthCredentials, type AuthResponse };
