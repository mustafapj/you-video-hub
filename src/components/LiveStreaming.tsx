
import React, { useState } from 'react';
import { Heart, MessageCircle, Gift, Users, Settings } from 'lucide-react';

const LiveStreaming = () => {
  const [viewerCount, setViewerCount] = useState(234);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'user123', message: 'Great stream!' },
    { id: 2, user: 'viewer456', message: 'Love your content! 💖' },
    { id: 3, user: 'fan789', message: 'Can you play my song?' },
  ]);

  return (
    <div className="bg-black min-h-screen relative">
      {/* Mock Video Stream */}
      <div className="relative h-screen bg-gradient-to-br from-purple-900 to-pink-900">
        {/* Stream Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="bg-red-500 px-3 py-1 rounded-full flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-bold">LIVE</span>
          </div>
          <div className="bg-black/50 backdrop-blur-lg rounded-full px-3 py-1 flex items-center space-x-2">
            <Users className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{viewerCount}</span>
          </div>
        </div>

        {/* Stream Info */}
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-4">
            <h3 className="text-white font-bold text-lg">Live from the Studio</h3>
            <p className="text-gray-300 text-sm">Creating music in real-time 🎵</p>
          </div>
        </div>

        {/* Live Chat */}
        <div className="absolute right-4 bottom-32 top-20 w-64 z-10">
          <div className="bg-black/50 backdrop-blur-lg rounded-lg h-full flex flex-col">
            <div className="p-3 border-b border-gray-600">
              <h4 className="text-white font-semibold">Live Chat</h4>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="text-pink-400 font-semibold">{msg.user}: </span>
                  <span className="text-white">{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-600">
              <input
                type="text"
                placeholder="Say something..."
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="absolute bottom-32 left-4 flex space-x-3 z-10">
          <button className="bg-pink-500 p-3 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </button>
          <button className="bg-purple-500 p-3 rounded-full">
            <Gift className="w-6 h-6 text-white" />
          </button>
          <button className="bg-blue-500 p-3 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveStreaming;
