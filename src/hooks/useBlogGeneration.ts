import { useState } from 'react';
import { GeminiService, BlogGenerationRequest } from '../services/geminiService';
import { BlogPost } from '../types/blog';

export const useBlogGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPosts, setGeneratedPosts] = useState<BlogPost[]>([]);

  const geminiService = new GeminiService();

  const generateSinglePost = async (request: BlogGenerationRequest): Promise<BlogPost | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const post = await geminiService.generateBlogPost(request);
      setGeneratedPosts(prev => [post, ...prev]);
      return post;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate blog post';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMultiplePosts = async (count: number): Promise<BlogPost[]> => {
    setIsGenerating(true);
    setError(null);

    try {
      const posts = await geminiService.generateMultiplePosts(count);
      setGeneratedPosts(prev => [...posts, ...prev]);
      return posts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate blog posts';
      setError(errorMessage);
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTopicIdeas = async (category: string, count: number = 5): Promise<string[]> => {
    try {
      return await geminiService.generateTopicIdeas(category, count);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate topic ideas';
      setError(errorMessage);
      return [];
    }
  };

  const clearError = () => setError(null);
  const clearGeneratedPosts = () => setGeneratedPosts([]);

  return {
    isGenerating,
    error,
    generatedPosts,
    generateSinglePost,
    generateMultiplePosts,
    generateTopicIdeas,
    clearError,
    clearGeneratedPosts
  };
};