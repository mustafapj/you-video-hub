
import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  onOpenPanel: () => void;
}

const Header = ({ onOpenPanel }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-900/90 to-cyan-900/90 backdrop-blur-lg border-b border-cyan-500/30">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Top Status Dots */}
        <div className="flex space-x-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < 7 ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Center - Arabic App Name */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-2 px-4 rounded-full">
            <h1 className="text-white text-lg font-bold">منتدى الـعرب الكبير</h1>
          </div>
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center">
          <button className="relative p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors">
            <Bell className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
