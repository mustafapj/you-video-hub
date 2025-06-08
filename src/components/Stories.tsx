
import React from 'react';
import { Plus } from 'lucide-react';

const Stories = () => {
  const stories = [
    { id: 1, username: 'You', hasStory: false, isOwn: true },
    { id: 2, username: 'alex_creates', hasStory: true },
    { id: 3, username: 'foodie_adventures', hasStory: true },
    { id: 4, username: 'tech_wizard', hasStory: true },
    { id: 5, username: 'artist_jen', hasStory: true },
    { id: 6, username: 'music_lover', hasStory: true },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900">
      {/* White dots representing stories */}
      <div className="flex space-x-2 justify-center mb-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i < 5 ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-2 min-w-[70px]">
            <div className={`w-14 h-14 rounded-full p-1 ${
              story.hasStory ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-600'
            }`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                {story.isOwn ? (
                  <Plus className="w-6 h-6 text-gray-600" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500" />
                )}
              </div>
            </div>
            <span className="text-xs text-white truncate max-w-[70px]">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
