import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/categories';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, featured = false }) => {
  const category = categories.find(cat => cat.slug === post.category);
  
  return (
    <article 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {category && (
          <div className={`absolute top-4 left-4 px-3 py-1 ${category.color} text-white text-xs font-medium rounded-full`}>
            {category.name}
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        <h2 className={`font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors ${
          featured ? 'text-xl md:text-2xl mb-4' : 'text-lg mb-3'
        }`}>
          {post.title}
        </h2>
        
        <p className={`text-gray-600 line-clamp-3 ${featured ? 'text-base mb-6' : 'text-sm mb-4'}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;