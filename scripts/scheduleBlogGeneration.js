import cron from 'node-cron';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI('AIzaSyCKDwZzoyABGEnDYkh0mEMB9nXSFb2jArk');

const categories = [
  { slug: 'technology', name: 'Technology' },
  { slug: 'health', name: 'Health' },
  { slug: 'travel', name: 'Travel' },
  { slug: 'lifestyle', name: 'Lifestyle' },
  { slug: 'finance', name: 'Finance' }
];

class BlogScheduler {
  constructor() {
    this.isRunning = false;
    this.generatedToday = 0;
    this.maxDailyPosts = 3;
  }

  async generateDailyContent() {
    if (this.isRunning || this.generatedToday >= this.maxDailyPosts) {
      console.log('⏭️ Skipping generation - already running or daily limit reached');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting scheduled blog generation...');

    try {
      // Generate 1-3 posts per day
      const postsToGenerate = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < postsToGenerate && this.generatedToday < this.maxDailyPosts; i++) {
        await this.generateSinglePost();
        this.generatedToday++;
        
        // Wait between generations to avoid rate limiting
        if (i < postsToGenerate - 1) {
          await this.sleep(30000); // 30 seconds
        }
      }

      console.log(`✅ Daily generation complete. Generated ${this.generatedToday} posts today.`);
    } catch (error) {
      console.error('❌ Error in scheduled generation:', error);
    } finally {
      this.isRunning = false;
    }
  }

  async generateSinglePost() {
    try {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      console.log(`📝 Generating post for ${randomCategory.name}...`);

      const topics = await this.generateTopicIdeas(randomCategory, 1);
      if (topics.length === 0) {
        console.log('❌ No topics generated, skipping...');
        return;
      }

      const blogPost = await this.generateBlogPost(randomCategory, topics[0]);
      
      // Save to generated posts directory
      await this.saveBlogPost(blogPost);
      
      console.log(`✅ Generated: "${blogPost.title}"`);
      
      // Here you would typically save to your database or CMS
      // For now, we'll just log and save to file
      
    } catch (error) {
      console.error('❌ Error generating single post:', error);
    }
  }

  async generateTopicIdeas(category, count = 1) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate ${count} engaging, SEO-friendly blog post topics for the ${category.name} category. 
    Focus on topics that are:
    - Trending and relevant in 2025
    - Valuable to readers
    - Search engine optimized
    - AdSense policy compliant
    - Original and unique
    
    Return only the topic titles, one per line, without numbering or bullets.`;

    try {
      const result = await model.generateContent(prompt);
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

  async generateBlogPost(category, topic) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Write a comprehensive, high-quality blog post with the following requirements:

TOPIC: ${topic}
CATEGORY: ${category.name}
TARGET LENGTH: 1000-1500 words

REQUIREMENTS:
1. Create an engaging, SEO-friendly title
2. Write a compelling excerpt (150-200 characters)
3. Structure content with proper HTML headings (h2, h3)
4. Include actionable insights and valuable information
5. Ensure content is original and plagiarism-free
6. Make it SEO-optimized with natural keyword integration
7. Comply with Google AdSense policies
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
  "readTime": estimated_read_time_in_minutes
}

Current date: ${new Date().toISOString().split('T')[0]}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      return {
        id: Date.now().toString(),
        slug: this.generateSlug(parsedData.title),
        title: parsedData.title,
        excerpt: parsedData.excerpt,
        content: parsedData.content,
        category: category.slug,
        author: 'AI Content Generator',
        publishDate: new Date().toISOString().split('T')[0],
        readTime: parsedData.readTime || this.estimateReadTime(parsedData.content),
        image: this.getRandomStockImage(category.slug),
        tags: parsedData.tags || [],
        seoTitle: parsedData.seoTitle || parsedData.title,
        metaDescription: parsedData.metaDescription || parsedData.excerpt,
        featured: Math.random() < 0.2 // 20% chance of being featured
      };
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw error;
    }
  }

  async saveBlogPost(blogPost) {
    const outputDir = 'scheduled-posts';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filename = `${blogPost.publishDate}-${blogPost.slug}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(blogPost, null, 2));
    console.log(`💾 Saved to: ${filepath}`);
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  estimateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  getRandomStockImage(category) {
    const imageMap = {
      technology: [
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      health: [
        'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      travel: [
        'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1252594/pexels-photo-1252594.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      lifestyle: [
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      finance: [
        'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    };

    const categoryImages = imageMap[category] || imageMap.technology;
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetDailyCounter() {
    this.generatedToday = 0;
    console.log('🔄 Daily counter reset');
  }

  startScheduler() {
    console.log('⏰ Starting blog scheduler...');
    
    // Generate content daily at 9 AM
    cron.schedule('0 9 * * *', () => {
      console.log('⏰ Daily generation triggered at 9 AM');
      this.generateDailyContent();
    });

    // Reset daily counter at midnight
    cron.schedule('0 0 * * *', () => {
      this.resetDailyCounter();
    });

    // Optional: Generate content every 6 hours during business hours
    cron.schedule('0 9,15 * * *', () => {
      console.log('⏰ Scheduled generation triggered');
      this.generateDailyContent();
    });

    console.log('✅ Blog scheduler started successfully!');
    console.log('📅 Schedule: Daily at 9 AM and 3 PM');
    console.log('📊 Max posts per day:', this.maxDailyPosts);
  }

  stopScheduler() {
    console.log('⏹️ Stopping blog scheduler...');
    // Note: node-cron doesn't have a direct stop method for all tasks
    // In a real application, you'd track task references and destroy them
  }
}

// Main execution
const scheduler = new BlogScheduler();

if (import.meta.url === `file://${process.argv[1]}`) {
  // Start the scheduler
  scheduler.startScheduler();
  
  // Keep the process running
  console.log('🔄 Scheduler is running. Press Ctrl+C to stop.');
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down scheduler...');
    scheduler.stopScheduler();
    process.exit(0);
  });
}

export default BlogScheduler;