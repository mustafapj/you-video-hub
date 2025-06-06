
import React from 'react';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenPanel: () => void;
}

const Header = ({ onOpenPanel }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Left side - empty for balance */}
        <div className="w-16"></div>

        {/* Center - YOU Logo */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
            <h1 className="text-white text-xl font-bold tracking-wider">YOU</h1>
          </div>
        </div>

        {/* Right side - Notifications and Menu */}
        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>
          
          <button
            onClick={onOpenPanel}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
