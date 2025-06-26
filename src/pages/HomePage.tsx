import React from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/categories';
import BlogCard from '../components/BlogCard';
import AdSenseAd from '../components/AdSenseAd';
import Newsletter from '../components/Newsletter';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setCurrentPost: (post: BlogPost) => void;
  setCurrentCategory: (category: string | null) => void;
  blogPosts: BlogPost[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  setCurrentPage, 
  setCurrentPost, 
  setCurrentCategory,
  blogPosts 
}) => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  const handlePostClick = (post: BlogPost) => {
    setCurrentPost(post);
    setCurrentPage('post');
  };

  const handleCategoryClick = (categorySlug: string) => {
    setCurrentCategory(categorySlug);
    setCurrentPage('category');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to BlogHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover insightful articles on technology, health, travel, lifestyle, and finance. 
            Stay informed, stay inspired.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-sm"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-2 mb-8">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post)}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Ad Section */}
        <section className="mb-16">
          <AdSenseAd slot="homepage-banner" format="horizontal" className="h-32" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Posts */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-8">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
              </div>
              
              {recentPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {recentPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No articles available yet. Check back soon!</p>
                </div>
              )}
            </section>

            {/* Categories Overview */}
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-8">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                    <div className="mt-4 text-blue-600 font-medium group-hover:underline">
                      Explore {category.name} →
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter */}
            <Newsletter />

            {/* Sidebar Ad */}
            <AdSenseAd slot="sidebar-ad" format="vertical" className="h-64" />

            {/* Popular Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular This Week</h3>
                <div className="space-y-4">
                  {recentPosts.slice(0, 3).map((post, index) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      className="flex items-start space-x-3 cursor-pointer group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{post.readTime} min read</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Health', 'Travel', 'Lifestyle', 'Finance', 'AI', 'Wellness', 'Productivity', 'Investment'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;