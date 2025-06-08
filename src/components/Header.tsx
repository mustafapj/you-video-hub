
import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  onOpenPanel: () => void;
}

const Header = ({ onOpenPanel }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Top Status Dots */}
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          ))}
        </div>

        {/* Center - Arabic App Name with curved background */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
            <h1 className="text-white text-lg font-bold">منتدى العرب الكبير</h1>
          </div>
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center">
          <button 
            onClick={onOpenPanel}
            className="relative p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
