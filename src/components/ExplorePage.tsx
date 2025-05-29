
import React from 'react';

const ExplorePage = () => {
  const categories = ['Trending', 'Comedy', 'Education', 'Music', 'Food', 'Tech', 'Art', 'Sports'];
  
  const trendingVideos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    thumbnail: `🎬`,
    views: Math.floor(Math.random() * 1000000) + 10000,
  }));

  return (
    <div className="bg-black min-h-screen pt-4 pb-20">
      {/* Header */}
      <div className="px-4 mb-6">
        <h1 className="text-white text-2xl font-bold mb-4">Explore</h1>
        
        {/* Categories */}
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white rounded-full border border-pink-500/30 hover:from-pink-500/30 hover:to-purple-600/30 transition-all duration-200 whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {trendingVideos.map((video) => (
            <div
              key={video.id}
              className="aspect-[9/16] bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="h-full flex flex-col justify-between p-3">
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-4xl">{video.thumbnail}</span>
                </div>
                <div className="text-white text-sm font-semibold">
                  {video.views.toLocaleString()} views
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
