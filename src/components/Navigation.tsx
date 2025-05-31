
import React from 'react';
import { Home, Search, Plus, Bell, Bot } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'explore', icon: Search, label: 'استكشف' },
    { id: 'upload', icon: Plus, label: 'رفع' },
    { id: 'bot', icon: Bot, label: 'البوت' },
    { id: 'notifications', icon: Bell, label: 'إشعارات' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? 'text-pink-500'
                : 'text-gray-400 hover:text-white'
            } ${id === 'upload' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110' : ''} 
            ${id === 'bot' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105' : ''}`}
          >
            <Icon size={id === 'upload' || id === 'bot' ? 24 : 20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
