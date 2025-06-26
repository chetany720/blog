import React, { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { categories } from '../data/categories';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setCurrentCategory: (category: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, setCurrentCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categorySlug: string) => {
    setCurrentCategory(categorySlug);
    setCurrentPage('category');
    setIsMenuOpen(false);
  };

  const handlePageClick = (page: string) => {
    setCurrentPage(page);
    setCurrentCategory(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handlePageClick('home')}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              BlogHub
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handlePageClick('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 'category' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {category.name}
              </button>
            ))}

            <button
              onClick={() => handlePageClick('about')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'about' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handlePageClick('contact')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'contact' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Search and User Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <button
                onClick={() => handlePageClick('home')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                Home
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {category.name}
                </button>
              ))}

              <button
                onClick={() => handlePageClick('about')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                About
              </button>

              <button
                onClick={() => handlePageClick('contact')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;