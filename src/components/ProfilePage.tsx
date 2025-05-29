
import React from 'react';
import { User, Heart, Eye, Users } from 'lucide-react';

const ProfilePage = () => {
  const userStats = {
    followers: 45200,
    following: 892,
    likes: 1200000,
  };

  const userVideos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    thumbnail: '🎬',
    views: Math.floor(Math.random() * 100000) + 1000,
  }));

  return (
    <div className="bg-black min-h-screen pt-4 pb-20">
      <div className="px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-white text-xl font-bold mb-2">@your_username</h1>
          <p className="text-gray-300 text-sm mb-4">✨ Creating amazing content daily</p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.followers.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.following.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Following</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.likes.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Likes</div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="px-8 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200">
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          <button className="flex-1 py-3 text-center text-white border-b-2 border-pink-500 font-semibold">
            Videos
          </button>
          <button className="flex-1 py-3 text-center text-gray-400 hover:text-white transition-colors">
            Liked
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-2">
          {userVideos.map((video) => (
            <div
              key={video.id}
              className="aspect-[9/16] bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer relative"
            >
              <div className="h-full flex flex-col justify-between p-2">
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-2xl">{video.thumbnail}</span>
                </div>
                <div className="flex items-center text-white text-xs">
                  <Eye size={12} className="mr-1" />
                  {video.views.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
