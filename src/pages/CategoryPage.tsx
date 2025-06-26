import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/categories';
import BlogCard from '../components/BlogCard';
import AdSenseAd from '../components/AdSenseAd';

interface CategoryPageProps {
  category: string;
  setCurrentPage: (page: string) => void;
  setCurrentPost: (post: BlogPost) => void;
  blogPosts: BlogPost[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ 
  category, 
  setCurrentPage, 
  setCurrentPost,
  blogPosts 
}) => {
  const categoryData = categories.find(cat => cat.slug === category);
  const categoryPosts = blogPosts.filter(post => post.category === category);

  const handlePostClick = (post: BlogPost) => {
    setCurrentPost(post);
    setCurrentPage('post');
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <button
            onClick={() => setCurrentPage('home')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section className={`${categoryData.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{categoryData.name}</h1>
              <p className="text-xl text-gray-100 mt-2">{categoryData.description}</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-100">
            {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {categoryPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {categoryPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={() => handlePostClick(post)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-600">We're working on adding more content to this category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ad */}
            <AdSenseAd slot="category-sidebar" format="vertical" className="h-64" />

            {/* Related Categories */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Other Categories</h3>
              <div className="space-y-3">
                {categories
                  .filter(cat => cat.slug !== category)
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCurrentPage('category');
                        // This would need to be passed down or handled by parent
                      }}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`w-8 h-8 ${cat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <div className="w-4 h-4 bg-white rounded"></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {blogPosts.filter(p => p.category === cat.slug).length} articles
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Category Stats */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Category Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Articles</span>
                  <span className="font-semibold text-gray-900">{categoryPosts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Read Time</span>
                  <span className="font-semibold text-gray-900">
                    {categoryPosts.length > 0 
                      ? Math.round(categoryPosts.reduce((acc, post) => acc + post.readTime, 0) / categoryPosts.length)
                      : 0
                    } min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Latest Update</span>
                  <span className="font-semibold text-gray-900">
                    {categoryPosts.length > 0 
                      ? new Date(Math.max(...categoryPosts.map(p => new Date(p.publishDate).getTime()))).toLocaleDateString()
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;