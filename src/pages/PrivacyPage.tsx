import React from 'react';
import { ArrowLeft, Shield, Eye, Cookie, UserCheck, Database, Lock } from 'lucide-react';

interface PrivacyPageProps {
  setCurrentPage: (page: string) => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ setCurrentPage }) => {
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

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 15, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-600 mb-8">
                At BlogHub, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
              </p>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Database className="w-6 h-6 text-blue-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Name and email address (when you subscribe to our newsletter or contact us)</li>
                <li>Comments and feedback you provide on our articles</li>
                <li>Information in correspondence you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring websites and search terms used</li>
                <li>Device information and operating system</li>
              </ul>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Eye className="w-6 h-6 text-green-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To provide and improve our content and services</li>
                <li>To send you our newsletter (only if you've subscribed)</li>
                <li>To respond to your comments and inquiries</li>
                <li>To analyze website usage and improve user experience</li>
                <li>To display relevant advertisements through Google AdSense</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Cookie className="w-6 h-6 text-orange-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. 
                Types of cookies we use include:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              
              <p className="text-gray-600 mt-4">
                You can control cookies through your browser settings, but disabling certain cookies may affect site functionality.
              </p>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <UserCheck className="w-6 h-6 text-purple-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Google AdSense</h3>
              <p className="text-gray-600 mb-4">
                We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on 
                your prior visits to our site or other websites. You can opt out of personalized advertising by visiting 
                Google's Ad Settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Analytics</h3>
              <p className="text-gray-600 mb-4">
                We use Google Analytics to analyze website usage. This service may collect information such as your IP address, 
                browser type, and usage patterns. You can opt out by installing the Google Analytics opt-out browser add-on.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Social Media</h3>
              <p className="text-gray-600 mb-4">
                Our website includes social media sharing buttons. These services may collect information about your visit to our site.
              </p>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Lock className="w-6 h-6 text-red-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Regular security updates and monitoring</li>
                <li>Restricted access to personal information</li>
                <li>Secure data storage practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              
              <p className="text-gray-600 mb-4">You have the right to:</p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              
              <p className="text-gray-600 mt-4">
                To exercise these rights, please contact us at privacy@bloghub.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              
              <p className="text-gray-600">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-600 space-y-1">
                  <li>Email: privacy@bloghub.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Blog Street, Content City, CC 12345</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;