
import React from 'react';

interface HeaderProps {
  onOpenPanel: () => void;
}

const Header = ({ onOpenPanel }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Left side - Menu button */}
        <div className="flex items-center">
          <button
            onClick={onOpenPanel}
            className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">☰</span>
          </button>
        </div>

        {/* Center - YOU Logo */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
            <h1 className="text-white text-xl font-bold tracking-wider">YOU</h1>
          </div>
        </div>

        {/* Right side - placeholder for balance */}
        <div className="w-7"></div>
      </div>
    </header>
  );
};

export default Header;
