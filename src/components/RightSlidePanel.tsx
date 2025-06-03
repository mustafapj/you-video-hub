
import React from 'react';
import { MessageCircle, Users, FileText, Radio, Phone, Settings, HelpCircle, Shield, Lock } from 'lucide-react';

interface RightSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenPolicy?: (type: 'terms' | 'privacy' | 'community') => void;
  onOpenMessages?: () => void;
}

const RightSlidePanel = ({ isOpen, onClose, onOpenSettings, onOpenPolicy, onOpenMessages }: RightSlidePanelProps) => {
  const menuItems = [
    { icon: MessageCircle, label: 'Direct Messages', count: 3, action: 'messages' },
    { icon: FileText, label: 'Pages', count: 0, action: 'pages' },
    { icon: Users, label: 'Groups', count: 2, action: 'groups' },
    { icon: Radio, label: 'Channels', count: 1, action: 'channels' },
    { icon: Phone, label: 'Random Calls', count: 0, action: 'calls' },
    { icon: Settings, label: 'Settings', count: 0, action: 'settings' },
    { icon: HelpCircle, label: 'Support', count: 0, action: 'support' },
  ];

  const policyItems = [
    { icon: Shield, label: 'Terms & Conditions', action: () => onOpenPolicy?.('terms') },
    { icon: Lock, label: 'Privacy Policy', action: () => onOpenPolicy?.('privacy') },
    { icon: Users, label: 'Community Guidelines', action: () => onOpenPolicy?.('community') },
  ];

  const handleMenuClick = (action: string) => {
    if (action === 'settings' && onOpenSettings) {
      onOpenSettings();
    } else if (action === 'messages' && onOpenMessages) {
      onOpenMessages();
    }
    // Handle other menu actions here
  };

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
        
        {/* Main Menu Items */}
        <div className="space-y-4 mb-8">
          {menuItems.map(({ icon: Icon, label, count, action }) => (
            <button
              key={label}
              onClick={() => handleMenuClick(action)}
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

        {/* Policy Section */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Legal & Policies</h3>
          <div className="space-y-3">
            {policyItems.map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSlidePanel;
