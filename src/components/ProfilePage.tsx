
import React from 'react';
import { User, Heart, Eye, Users, ArrowLeft } from 'lucide-react';

const ProfilePage = () => {
  const userStats = {
    followers: 45200,
    following: 892,
    likes: 1200000,
  };

  const userVideos = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    thumbnail: '🎬',
    views: Math.floor(Math.random() * 100000) + 1000,
  }));

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 min-h-screen pt-4 pb-20">
      <div className="px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold mr-4">الملف الشخصي</h1>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-white text-xl font-bold mb-2">@your_username</h1>
          <p className="text-cyan-300 text-sm mb-4">✨ إنشاء محتوى مذهل يومياً</p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.followers.toLocaleString()}</div>
              <div className="text-cyan-300 text-sm">متابع</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.following.toLocaleString()}</div>
              <div className="text-cyan-300 text-sm">يتابع</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-bold">{userStats.likes.toLocaleString()}</div>
              <div className="text-cyan-300 text-sm">إعجاب</div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200">
            تعديل الملف الشخصي
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cyan-500/30 mb-6">
          <button className="flex-1 py-3 text-center text-white border-b-2 border-cyan-400 font-semibold">
            الفيديوهات
          </button>
          <button className="flex-1 py-3 text-center text-cyan-300 hover:text-white transition-colors">
            المفضلة
          </button>
        </div>

        {/* Video Grid - 3x3 layout to match the design */}
        <div className="grid grid-cols-3 gap-3">
          {userVideos.map((video) => (
            <div
              key={video.id}
              className="aspect-square bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer relative backdrop-blur-sm border border-white/10"
            >
              <div className="h-full flex flex-col justify-between p-3">
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
