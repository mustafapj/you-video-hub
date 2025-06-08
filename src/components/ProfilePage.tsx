
import React from 'react';
import { User, Heart, Eye, Users, ArrowLeft, Camera, Home, MessageCircle, Users as GroupIcon, Radio, QrCode } from 'lucide-react';

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
          <button className="p-2 rounded-full bg-red-500">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold mr-4">الملف الشخصي</h1>
        </div>

        {/* Big red rectangle with cyan background inside */}
        <div className="bg-red-500 p-4 rounded-2xl mb-6">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-xl relative">
            {/* Profile background and image */}
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
                <User size={40} className="text-white" />
                {/* Two small cameras */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <Camera size={14} className="text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <Camera size={14} className="text-white" />
                </div>
              </div>
              
              <h1 className="text-white text-xl font-bold mb-2">@your_username</h1>
              <p className="text-cyan-100 text-sm mb-4">✨ إنشاء محتوى مذهل يومياً</p>
              
              {/* Stats */}
              <div className="flex justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-white text-lg font-bold">{userStats.followers.toLocaleString()}</div>
                  <div className="text-cyan-100 text-sm">متابع</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-lg font-bold">{userStats.following.toLocaleString()}</div>
                  <div className="text-cyan-100 text-sm">يتابع</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-lg font-bold">{userStats.likes.toLocaleString()}</div>
                  <div className="text-cyan-100 text-sm">إعجاب</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Five icons below the big camera */}
        <div className="flex justify-around mb-6 bg-white/10 p-4 rounded-xl">
          <button className="flex flex-col items-center">
            <GroupIcon className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs">المجموعة</span>
          </button>
          <button className="flex flex-col items-center">
            <Radio className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs">القنوات</span>
          </button>
          <button className="flex flex-col items-center">
            <MessageCircle className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs">الرسائل</span>
          </button>
          <button className="flex flex-col items-center">
            <Home className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs">المنزل</span>
          </button>
          <button className="flex flex-col items-center">
            <QrCode className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs">QR</span>
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

        {/* Video Grid */}
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
