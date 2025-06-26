import { GoogleGenerativeAI } from '@google/generative-ai';
import { BlogPost } from '../types/blog';
import { categories } from '../data/categories';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface BlogGenerationRequest {
  category: string;
  topic?: string;
  keywords?: string[];
  targetLength?: number;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateBlogPost(request: BlogGenerationRequest): Promise<BlogPost> {
    const category = categories.find(cat => cat.slug === request.category);
    if (!category) {
      throw new Error(`Category ${request.category} not found`);
    }

    const prompt = this.createBlogPrompt(request, category);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseBlogResponse(text, request.category);
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw new Error('Failed to generate blog post');
    }
  }

  async generateMultiplePosts(count: number = 1): Promise<BlogPost[]> {
    const posts: BlogPost[] = [];
    const categoryList = categories.map(cat => cat.slug);
    
    for (let i = 0; i < count; i++) {
      const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
      const topics = await this.generateTopicIdeas(randomCategory, 1);
      
      if (topics.length > 0) {
        const post = await this.generateBlogPost({
          category: randomCategory,
          topic: topics[0],
          targetLength: 1000
        });
        posts.push(post);
      }
    }
    
    return posts;
  }

  async generateTopicIdeas(category: string, count: number = 5): Promise<string[]> {
    const categoryData = categories.find(cat => cat.slug === category);
    if (!categoryData) return [];

    const prompt = `Generate ${count} engaging, SEO-friendly blog post topics for the ${categoryData.name} category. 
    Focus on topics that are:
    - Trending and relevant in 2025
    - Valuable to readers
    - Search engine optimized
    - AdSense policy compliant
    - Original and unique
    
    Category description: ${categoryData.description}
    
    Return only the topic titles, one per line, without numbering or bullets.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text.split('\n')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0)
        .slice(0, count);
    } catch (error) {
      console.error('Error generating topics:', error);
      return [];
    }
  }

  private createBlogPrompt(request: BlogGenerationRequest, category: any): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `Write a comprehensive, high-quality blog post with the following requirements:

TOPIC: ${request.topic || `A trending topic in ${category.name}`}
CATEGORY: ${category.name}
TARGET LENGTH: ${request.targetLength || 1000} words
KEYWORDS: ${request.keywords?.join(', ') || 'Generate relevant SEO keywords'}

REQUIREMENTS:
1. Create an engaging, click-worthy title (not clickbait)
2. Write a compelling excerpt (150-200 characters)
3. Structure content with proper HTML headings (h2, h3)
4. Include actionable insights and valuable information
5. Ensure content is original and plagiarism-free
6. Make it SEO-optimized with natural keyword integration
7. Comply with Google AdSense policies (no prohibited content)
8. Include practical examples and tips
9. Write in a conversational, engaging tone
10. Ensure content is factually accurate and up-to-date

FORMAT YOUR RESPONSE AS JSON:
{
  "title": "Blog post title",
  "excerpt": "Brief description of the post",
  "content": "Full HTML content with proper headings and formatting",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoTitle": "SEO optimized title for search engines",
  "metaDescription": "Meta description for SEO (150-160 characters)",
  "readTime": estimated_read_time_in_minutes,
  "author": "AI Content Generator"
}

Current date: ${currentDate}
Write about current trends and information relevant to ${currentDate}.`;
  }

  private parseBlogResponse(response: string, category: string): BlogPost {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Generate unique ID and slug
      const id = Date.now().toString();
      const slug = this.generateSlug(parsedData.title);
      
      // Get random stock image based on category
      const image = this.getRandomStockImage(category);
      
      return {
        id,
        slug,
        title: parsedData.title,
        excerpt: parsedData.excerpt,
        content: parsedData.content,
        category,
        author: parsedData.author || 'AI Content Generator',
        publishDate: new Date().toISOString().split('T')[0],
        readTime: parsedData.readTime || this.estimateReadTime(parsedData.content),
        image,
        tags: parsedData.tags || [],
        seoTitle: parsedData.seoTitle || parsedData.title,
        metaDescription: parsedData.metaDescription || parsedData.excerpt,
        featured: false
      };
    } catch (error) {
      console.error('Error parsing blog response:', error);
      throw new Error('Failed to parse generated blog content');
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private estimateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private getRandomStockImage(category: string): string {
    const imageMap: Record<string, string[]> = {
      technology: [
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      health: [
        'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      travel: [
        'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1252594/pexels-photo-1252594.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      lifestyle: [
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      finance: [
        'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    };

    const categoryImages = imageMap[category] || imageMap.technology;
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }
}