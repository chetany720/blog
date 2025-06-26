import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from 'lucide-react';

interface TermsPageProps {
  setCurrentPage: (page: string) => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ setCurrentPage }) => {
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
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 15, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-600 mb-8">
                Welcome to BlogHub. These Terms of Service ("Terms") govern your use of our website and services. 
                By accessing or using BlogHub, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                By accessing and using BlogHub, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <Scale className="w-6 h-6 text-green-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Use License</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily access and view the materials on BlogHub for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              
              <p className="text-gray-600 mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Content</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comments and Feedback</h3>
              <p className="text-gray-600 mb-4">
                When you post comments or provide feedback on our website, you grant BlogHub a non-exclusive, royalty-free, 
                perpetual license to use, modify, and display your content in connection with our services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Standards</h3>
              <p className="text-gray-600 mb-4">
                You agree not to post content that:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Is unlawful, harmful, threatening, abusive, harassing, or defamatory</li>
                <li>Infringes on any third party's intellectual property rights</li>
                <li>Contains viruses or other harmful computer code</li>
                <li>Is spam or constitutes unauthorized advertising</li>
                <li>Violates any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                The materials on BlogHub are provided on an 'as is' basis. BlogHub makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions 
                of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              
              <p className="text-gray-600 mb-4">
                Further, BlogHub does not warrant or make any representations concerning the accuracy, likely results, or reliability 
                of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
              
              <p className="text-gray-600 mb-4">
                In no event shall BlogHub or its suppliers be liable for any damages (including, without limitation, damages for 
                loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
                on BlogHub, even if BlogHub or a BlogHub authorized representative has been notified orally or in writing of the 
                possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations 
                of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
              
              <p className="text-gray-600 mb-4">
                The materials appearing on BlogHub could include technical, typographical, or photographic errors. BlogHub does not 
                warrant that any of the materials on its website are accurate, complete, or current. BlogHub may make changes to the 
                materials contained on its website at any time without notice. However, BlogHub does not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
              
              <p className="text-gray-600 mb-4">
                BlogHub has not reviewed all of the sites linked to our website and is not responsible for the contents of any such 
                linked site. The inclusion of any link does not imply endorsement by BlogHub of the site. Use of any such linked 
                website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
              
              <p className="text-gray-600 mb-4">
                BlogHub may revise these terms of service for its website at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              
              <p className="text-gray-600 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of the United States and 
                you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
              
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                to understand our practices.
              </p>
              
              <button
                onClick={() => setCurrentPage('privacy')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Privacy Policy →
              </button>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-600 space-y-1">
                  <li>Email: legal@bloghub.com</li>
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

export default TermsPage;