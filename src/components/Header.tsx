
import React from 'react';

interface HeaderProps {
  onOpenPanel: () => void;
  onSetFeature: (feature: string | null) => void;
}

const Header = ({ onOpenPanel, onSetFeature }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Left side - Feature buttons and menu */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSetFeature('live')}
            className="bg-red-500 px-2 py-1 rounded-full text-white text-xs font-bold"
          >
            LIVE
          </button>
          <button
            onClick={() => onSetFeature('randomCall')}
            className="bg-green-500 px-2 py-1 rounded-full text-white text-xs font-bold"
          >
            CALL
          </button>
          <button
            onClick={() => onSetFeature('subscriptions')}
            className="bg-purple-500 px-2 py-1 rounded-full text-white text-xs font-bold"
          >
            PRO
          </button>
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
        <div className="w-20"></div>
      </div>
    </header>
  );
};

export default Header;
