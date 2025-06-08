
import React from 'react';
import { Home, Search, Plus, Bell, Menu } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenPanel: () => void;
  menuNotifications?: number;
}

const Navigation = ({ activeTab, onTabChange, onOpenPanel, menuNotifications = 0 }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'explore', icon: Search, label: 'استكشف' },
    { id: 'upload', icon: Plus, label: 'رفع' },
    { id: 'notifications', icon: Bell, label: 'إشعارات' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg">
      <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? 'text-white bg-white/20 scale-110 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {id === 'upload' ? (
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Icon size={20} className="text-cyan-500" />
              </div>
            ) : (
              <Icon size={22} />
            )}
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
        
        <button
          onClick={onOpenPanel}
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 relative"
        >
          <Menu size={22} />
          {menuNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center shadow-lg">
              {menuNotifications}
            </span>
          )}
          <span className="text-xs font-medium">القائمة</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
