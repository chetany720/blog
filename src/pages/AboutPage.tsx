import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* About Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About BlogHub</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Welcome to BlogHub, your trusted source for insightful content across technology, health, travel, lifestyle, and finance. 
              We're passionate about creating valuable, well-researched articles that inform, inspire, and empower our readers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide high-quality, accessible content that helps our readers make informed decisions and improve their lives across multiple domains.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Team</h3>
                  <p className="text-gray-600">
                    A diverse group of writers, researchers, and experts who are passionate about sharing knowledge and insights with our community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Standards</h3>
                  <p className="text-gray-600">
                    Every article is thoroughly researched, fact-checked, and reviewed to ensure accuracy and value for our readers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    We believe in fostering a supportive community where readers can learn, share, and grow together.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Technology', description: 'Latest tech trends, reviews, and digital innovations' },
                { title: 'Health', description: 'Wellness tips, fitness guides, and mental health resources' },
                { title: 'Travel', description: 'Destination guides, travel tips, and cultural insights' },
                { title: 'Lifestyle', description: 'Home organization, productivity, and personal development' },
                { title: 'Finance', description: 'Personal finance advice, investment strategies, and money management' }
              ].map((category) => (
                <div key={category.title} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{category.title}</h4>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-600 mb-4">
              We are committed to maintaining the highest editorial standards and providing content that adheres to Google AdSense policies. 
              Our articles are original, well-researched, and designed to provide genuine value to our readers.
            </p>
            
            <p className="text-gray-600 mb-8">
              We believe in transparency, accuracy, and ethical content creation. Our team works tirelessly to ensure that every piece of content 
              we publish meets our strict quality guidelines and serves our community's best interests.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get in Touch</h3>
              <p className="text-gray-600">
                Have questions, suggestions, or feedback? We'd love to hear from you. 
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                >
                  Contact us
                </button>
                {' '}and let's start a conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;