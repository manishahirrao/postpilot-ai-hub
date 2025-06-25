import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { dashboard } from '../lib/api';

type DashboardStats = {
  posts: number;
  jobs: number;
  credits: {
    balance: number;
    used: number;
    available: number;
  };
};

type RecentJob = {
  job_id: string;
  title: string;
  company: string;
  status: string;
  created_at: string;
};

type DashboardData = {
  user: {
    id: string;
    email: string;
    display_name: string;
    job_title?: string;
    company?: string;
    subscription_tier: string;
  };
  stats: DashboardStats;
  recent_jobs: RecentJob[];
  last_updated: string;
};

type DashboardState = {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;
};

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null,
    lastFetched: null,
  });

  const { toast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { data } = await dashboard.getDashboardData();
      
      setState(prev => ({
        ...prev,
        data,
        isLoading: false,
        lastFetched: new Date(),
      }));

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch dashboard data';
      console.error('Dashboard error:', error);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Dashboard Error',
        description: errorMessage,
        variant: 'destructive',
      });

      throw error;
    }
  }, [toast]);

  const refetch = useCallback(async () => {
    return fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Polling (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return {
    ...state,
    refetch,
    // Helper selectors
    stats: state.data?.stats || {
      posts: 0,
      jobs: 0,
      credits: { balance: 0, used: 0, available: 0 },
    },
    recentJobs: state.data?.recent_jobs || [],
    user: state.data?.user,
  };
}

// Profile hook
type UserProfile = {
  id: string;
  email: string;
  display_name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  industry?: string;
  key_skills?: string[];
  main_objectives?: string[];
  core_topics?: string;
  subscription_tier?: {
    tier_name: string;
    monthly_credits: number;
    max_credits: number;
    features: Record<string, any>;
  };
};

export function useProfile() {
  const [state, setState] = useState<{
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
  }>({
    profile: null,
    isLoading: true,
    error: null,
  });

  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { data } = await dashboard.getProfile();
      
      setState(prev => ({
        ...prev,
        profile: data,
        isLoading: false,
      }));

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch profile';
      console.error('Profile error:', error);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Profile Error',
        description: errorMessage,
        variant: 'destructive',
      });

      throw error;
    }
  }, [toast]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    ...state,
    refetch: fetchProfile,
  };
}
