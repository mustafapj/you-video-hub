
import React from 'react';
import { MessageCircle, Users, FileText, Radio, Phone, Settings, HelpCircle } from 'lucide-react';

interface RightSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSlidePanel = ({ isOpen, onClose }: RightSlidePanelProps) => {
  const menuItems = [
    { icon: MessageCircle, label: 'Direct Messages', count: 3 },
    { icon: FileText, label: 'Pages', count: 0 },
    { icon: Users, label: 'Groups', count: 2 },
    { icon: Radio, label: 'Channels', count: 1 },
    { icon: Phone, label: 'Random Calls', count: 0 },
    { icon: Settings, label: 'Settings', count: 0 },
    { icon: HelpCircle, label: 'Support', count: 0 },
  ];

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {menuItems.map(({ icon: Icon, label, count }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6 text-pink-500" />
                <span className="text-white font-medium">{label}</span>
              </div>
              {count > 0 && (
                <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSlidePanel;
