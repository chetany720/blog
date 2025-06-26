import React, { useState } from 'react';
import { BlogPost } from './types/blog';
import { blogPosts as initialBlogPosts } from './data/blogPosts';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  const handleNewPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    setCurrentPost(post);
    setCurrentPage('post');
  };

  const handleNewPosts = (posts: BlogPost[]) => {
    setBlogPosts(prev => [...posts, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setCurrentPost={setCurrentPost}
            setCurrentCategory={setCurrentCategory}
            blogPosts={blogPosts}
          />
        );
      case 'category':
        return currentCategory ? (
          <CategoryPage 
            category={currentCategory}
            setCurrentPage={setCurrentPage}
            setCurrentPost={setCurrentPost}
            blogPosts={blogPosts}
          />
        ) : (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setCurrentPost={setCurrentPost}
            setCurrentCategory={setCurrentCategory}
            blogPosts={blogPosts}
          />
        );
      case 'post':
        return currentPost ? (
          <BlogPostPage 
            post={currentPost}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setCurrentPost={setCurrentPost}
            setCurrentCategory={setCurrentCategory}
            blogPosts={blogPosts}
          />
        );
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPage setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return (
          <AdminPanel 
            onNewPost={handleNewPost}
            onNewPosts={handleNewPosts}
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setCurrentPost={setCurrentPost}
            setCurrentCategory={setCurrentCategory}
            blogPosts={blogPosts}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'admin' && (
        <Header 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCurrentCategory={setCurrentCategory}
        />
      )}
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'admin' && (
        <Footer setCurrentPage={setCurrentPage} />
      )}
      
      {/* Admin Access Button (Hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setCurrentPage('admin')}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
          title="Admin Panel"
        >
          ⚙️
        </button>
      )}
    </div>
  );
}

export default App;