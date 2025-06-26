import React from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ slot, format = 'auto', className = '' }) => {
  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${className}`}>
      <div className="text-gray-500 text-sm mb-2">Advertisement</div>
      <div className="text-gray-400 text-xs">
        AdSense Ad Slot: {slot}
      </div>
      <div className="text-gray-400 text-xs mt-1">
        Format: {format}
      </div>
      <div className="text-gray-400 text-xs mt-2">
        This space will display Google AdSense ads in production
      </div>
    </div>
  );
};

export default AdSenseAd;