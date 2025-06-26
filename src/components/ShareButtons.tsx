import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    email: `mailto:?subject=${shareTitle}&body=${shareUrl}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <div className="flex space-x-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={shareLinks.email}
          className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Share via Email"
        >
          <Mail size={16} />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          aria-label="Copy Link"
        >
          <Link2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;