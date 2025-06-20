import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import fs from 'fs';

interface LinkedInPostInput {
  account_type: 'personal' | 'company';
  user_name: string;
  industry: string;
  role_or_brand: string;
  post_topic: string;
  tone: 'inspirational' | 'bold' | 'humble' | 'confident' | 'professional';
  audience: string;
  image_path: string;
}

interface LinkedInPostOutput {
  post_text: string;
  image_caption: string;
  image_url: string;
  post_metadata: {
    account_type: string;
    industry: string;
    user_name: string;
    topic: string;
    audience: string;
    uploaded_at: string;
  };
}

export class LinkedInPostService {
  private openai: OpenAIApi;
  private cloudinaryConfigured: boolean = false;

  constructor() {
    // Configure OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Configure Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      this.cloudinaryConfigured = true;
    }
  }

  private async generatePostText(input: LinkedInPostInput): Promise<string> {
    const prompt = `
      You are a professional LinkedIn content writer. Generate a compelling LinkedIn post for a ${input.account_type} account.
      User: ${input.user_name}
      Industry: ${input.industry}
      Role/Brand: ${input.role_or_brand}
      Topic: ${input.post_topic}
      Tone: ${input.tone}
      Audience: ${input.audience}
      
      Requirements:
      1. Keep it under 200 words
      2. Make it engaging and professional
      3. Include relevant industry keywords
      4. End with a call-to-action
      5. Format with proper line breaks
      6. Include relevant hashtags at the end
      7. Make it shareable and conversation-starting
    `;

    try {
      const chat = this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      });

      return chat.choices[0].message?.content || '';
    } catch (error) {
      console.error('Error generating post text:', error);
      throw new Error('Failed to generate LinkedIn post text');
    }
  }

  private async generateImageCaption(input: LinkedInPostInput): Promise<string> {
    const prompt = `
      Generate a short, impactful image caption (max 8 words) for a LinkedIn post.
      User: ${input.user_name}
      Industry: ${input.industry}
      Topic: ${input.post_topic}
      Tone: ${input.tone}
      
      The caption should be engaging and relevant to the post topic.
    `;

    try {
      const chat = this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 20,
      });

      // Ensure the caption is within 8 words
      const caption = chat.choices[0].message?.content || '';
      return caption.split(' ').slice(0, 8).join(' ');
    } catch (error) {
      console.error('Error generating image caption:', error);
      throw new Error('Failed to generate image caption');
    }
  }

  private async uploadToCloudinary(imagePath: string): Promise<string> {
    if (!this.cloudinaryConfigured) {
      throw new Error('Cloudinary is not properly configured');
    }

    try {
      // Check if the file exists
      if (!fs.existsSync(imagePath)) {
        throw new Error('Image file not found');
      }

      // Upload to Cloudinary with optimization
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'linkedin_posts',
        quality: "auto",
        format: "auto",
        width: 800,
        crop: "scale",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        resource_type: "image"
      });

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

  async generateLinkedInPost(input: LinkedInPostInput): Promise<LinkedInPostOutput> {
    try {
      // Validate input
      if (!input.account_type || !input.user_name || !input.industry) {
        throw new Error('Missing required input parameters');
      }

      // Generate post content
      const postText = await this.generatePostText(input);
      const imageCaption = await this.generateImageCaption(input);
      const imageUrl = await this.uploadToCloudinary(input.image_path);

      const metadata = {
        account_type: input.account_type,
        industry: input.industry,
        user_name: input.user_name,
        topic: input.post_topic,
        audience: input.audience,
        uploaded_at: new Date().toISOString()
      };

      return {
        post_text: postText,
        image_caption: imageCaption,
        image_url: imageUrl,
        post_metadata: metadata
      };
    } catch (error) {
      console.error('Error generating LinkedIn post:', error);
      throw error;
    }
  }
}
