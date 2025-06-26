import React from 'react';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/categories';
import ShareButtons from '../components/ShareButtons';
import CommentSection from '../components/CommentSection';
import AdSenseAd from '../components/AdSenseAd';

interface BlogPostPageProps {
  post: BlogPost;
  setCurrentPage: (page: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, setCurrentPage }) => {
  const category = categories.find(cat => cat.slug === post.category);
  const currentUrl = `https://bloghub.com/posts/${post.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Articles</span>
        </button>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {category && (
              <div className={`absolute top-6 left-6 px-4 py-2 ${category.color} text-white text-sm font-medium rounded-full`}>
                {category.name}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Title and Meta */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Share Buttons */}
              <ShareButtons url={currentUrl} title={post.title} className="mb-6" />
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Ad Section */}
            <div className="my-8">
              <AdSenseAd slot="article-inline" format="horizontal" className="h-32" />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center space-x-3 mb-8 pb-8 border-b">
                <Tag size={16} className="text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">About {post.author}</h3>
                  <p className="text-gray-600 text-sm">
                    {post.author} is a passionate writer and expert in their field, dedicated to sharing valuable insights and knowledge with our readers. 
                    They bring years of experience and a unique perspective to every article.
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection />
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="text-center py-8 text-gray-500">
            <p>Related articles feature coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage;