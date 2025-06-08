
import React from 'react';
import { MessageCircle, Users, FileText, Radio, Phone, Settings, HelpCircle, Shield, Lock, Bot, Video, Crown, User } from 'lucide-react';

interface RightSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenPolicy?: (type: 'terms' | 'privacy' | 'community') => void;
  onOpenMessages?: () => void;
  onSetFeature?: (feature: string) => void;
}

const RightSlidePanel = ({ isOpen, onClose, onOpenSettings, onOpenPolicy, onOpenMessages, onSetFeature }: RightSlidePanelProps) => {
  const mainFeatures = [
    { icon: User, label: 'الملف الشخصي', count: 0, action: 'profile', color: 'from-blue-500 to-cyan-500' },
    { icon: Settings, label: 'الإعدادات', count: 0, action: 'settings', color: 'from-purple-500 to-pink-500' },
    { icon: HelpCircle, label: 'المساعدة والدعم', count: 0, action: 'support', color: 'from-green-500 to-emerald-500' },
    { icon: Crown, label: 'الاشتراكات المدفوعة', count: 0, action: 'subscriptions', color: 'from-yellow-500 to-orange-500' },
    { icon: Radio, label: 'البث المباشر', count: 0, action: 'live', color: 'from-red-500 to-pink-500' },
  ];

  const handleMenuClick = (action: string) => {
    if (action === 'settings' && onOpenSettings) {
      onOpenSettings();
    } else if (action === 'messages' && onOpenMessages) {
      onOpenMessages();
    } else if (onSetFeature) {
      onSetFeature(action);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Curved Background Panel matching the design */}
        <div className="h-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 relative overflow-hidden rounded-l-[3rem] shadow-2xl">
          {/* Decorative curved elements */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-5 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          
          <div className="p-6 pt-16 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors text-2xl font-light"
              >
                ✕
              </button>
            </div>
            
            {/* Menu Items with design matching the image */}
            <div className="space-y-4">
              {mainFeatures.map(({ icon: Icon, label, action, color }) => (
                <button
                  key={label}
                  onClick={() => handleMenuClick(action)}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all duration-200 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className={`bg-gradient-to-r ${color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg flex-1 text-right">{label}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Bottom decorative element */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-white/20 rounded-full p-4 backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-white/30 to-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSlidePanel;
