import React, { useState } from 'react';
import { Wand2, Loader2, Plus, Sparkles, RefreshCw } from 'lucide-react';
import { useBlogGeneration } from '../hooks/useBlogGeneration';
import { categories } from '../data/categories';
import { BlogPost } from '../types/blog';

interface BlogGeneratorProps {
  onPostGenerated?: (post: BlogPost) => void;
  onPostsGenerated?: (posts: BlogPost[]) => void;
}

const BlogGenerator: React.FC<BlogGeneratorProps> = ({ onPostGenerated, onPostsGenerated }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [targetLength, setTargetLength] = useState(1000);
  const [bulkCount, setBulkCount] = useState(1);
  const [topicIdeas, setTopicIdeas] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  const {
    isGenerating,
    error,
    generatedPosts,
    generateSinglePost,
    generateMultiplePosts,
    generateTopicIdeas,
    clearError
  } = useBlogGeneration();

  const handleGenerateSingle = async () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    const request = {
      category: selectedCategory,
      topic: selectedTopic || customTopic || undefined,
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : undefined,
      targetLength
    };

    const post = await generateSinglePost(request);
    if (post && onPostGenerated) {
      onPostGenerated(post);
    }
  };

  const handleGenerateBulk = async () => {
    const posts = await generateMultiplePosts(bulkCount);
    if (posts.length > 0 && onPostsGenerated) {
      onPostsGenerated(posts);
    }
  };

  const handleGenerateTopics = async () => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }

    const topics = await generateTopicIdeas(selectedCategory, 10);
    setTopicIdeas(topics);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Wand2 className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Blog Generator</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start">
            <p className="text-red-700">{error}</p>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Post Generation */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Generate Single Post</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Topic Ideas
              </label>
              <button
                onClick={handleGenerateTopics}
                disabled={!selectedCategory || isGenerating}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Ideas</span>
              </button>
            </div>
            
            {topicIdeas.length > 0 && (
              <div className="mb-3 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                {topicIdeas.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(topic)}
                    className={`block w-full text-left text-sm p-2 rounded hover:bg-gray-50 ${
                      selectedTopic === topic ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Or enter a custom topic..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="SEO, optimization, content marketing"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Length (words)
            </label>
            <select
              value={targetLength}
              onChange={(e) => setTargetLength(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={500}>500 words (Short)</option>
              <option value={1000}>1000 words (Medium)</option>
              <option value={1500}>1500 words (Long)</option>
              <option value={2000}>2000 words (Comprehensive)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateSingle}
            disabled={isGenerating || !selectedCategory}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Blog Post</span>
              </>
            )}
          </button>
        </div>

        {/* Bulk Generation */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Bulk Generation</span>
          </h3>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Auto-Generate Multiple Posts</h4>
            <p className="text-sm text-blue-700 mb-4">
              Generate multiple blog posts across different categories automatically. 
              Perfect for building content quickly.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Number of Posts
              </label>
              <select
                value={bulkCount}
                onChange={(e) => setBulkCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 post</option>
                <option value={3}>3 posts</option>
                <option value={5}>5 posts</option>
                <option value={10}>10 posts</option>
              </select>
            </div>

            <button
              onClick={handleGenerateBulk}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating {bulkCount} posts...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Generate {bulkCount} Posts</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Posts Preview */}
          {generatedPosts.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recently Generated ({generatedPosts.length})</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {generatedPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="bg-gray-50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 text-sm line-clamp-1">{post.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      {post.category} • {post.readTime} min read
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">💡 Tips for Better Results</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Be specific with topics for more targeted content</li>
          <li>• Use relevant keywords to improve SEO optimization</li>
          <li>• Longer posts (1000+ words) tend to perform better in search</li>
          <li>• Review and edit generated content before publishing</li>
          <li>• Generated content is AdSense-compliant and original</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogGenerator;