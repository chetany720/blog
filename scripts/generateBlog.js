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

async function generateBlogPost(category, topic) {
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
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    
    // Create blog post object
    const blogPost = {
      id: Date.now().toString(),
      slug: generateSlug(parsedData.title),
      title: parsedData.title,
      excerpt: parsedData.excerpt,
      content: parsedData.content,
      category: category.slug,
      author: 'AI Content Generator',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: parsedData.readTime || estimateReadTime(parsedData.content),
      image: getRandomStockImage(category.slug),
      tags: parsedData.tags || [],
      seoTitle: parsedData.seoTitle || parsedData.title,
      metaDescription: parsedData.metaDescription || parsedData.excerpt,
      featured: false
    };

    return blogPost;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function getRandomStockImage(category) {
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

async function generateTopicIdeas(category, count = 5) {
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

// Main execution
async function main() {
  try {
    console.log('🤖 Starting AI blog generation...');
    
    // Generate topics for a random category
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    console.log(`📝 Generating topics for ${randomCategory.name}...`);
    
    const topics = await generateTopicIdeas(randomCategory, 3);
    console.log('💡 Generated topics:', topics);
    
    if (topics.length === 0) {
      console.log('❌ No topics generated. Exiting...');
      return;
    }
    
    // Generate a blog post for the first topic
    const selectedTopic = topics[0];
    console.log(`✍️ Generating blog post: "${selectedTopic}"`);
    
    const blogPost = await generateBlogPost(randomCategory, selectedTopic);
    
    // Save to file (optional - for testing)
    const outputDir = 'generated-posts';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    const filename = `${blogPost.slug}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(blogPost, null, 2));
    
    console.log('✅ Blog post generated successfully!');
    console.log(`📄 Title: ${blogPost.title}`);
    console.log(`📂 Category: ${blogPost.category}`);
    console.log(`⏱️ Read time: ${blogPost.readTime} minutes`);
    console.log(`💾 Saved to: ${filepath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}