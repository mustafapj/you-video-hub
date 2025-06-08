
import React, { useState } from 'react';
import { Heart, MessageSquare, Share, Search, User, Plus } from 'lucide-react';

interface VideoCardProps {
  id: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  isFollowing: boolean;
  videoUrl?: string;
  profileImage?: string;
}

const VideoCard = ({ 
  username, 
  description, 
  likes, 
  comments, 
  isFollowing,
  profileImage 
}: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleFollow = () => {
    setIsFollowingState(!isFollowingState);
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex">
      {/* White rectangle background for video */}
      <div className="absolute inset-4 bg-white/10 rounded-lg border-2 border-white flex items-center justify-center">
        <div className="text-white/50 text-6xl">🎥</div>
      </div>

      {/* Publisher profile - Black circle with red plus */}
      <div className="absolute top-20 left-6 z-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
            {profileImage ? (
              <img src={profileImage} alt={username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="text-white" size={20} />
            )}
          </div>
          {!isFollowingState && (
            <button
              onClick={handleFollow}
              className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Plus className="text-white" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Video Info Overlay */}
      <div className="absolute bottom-32 left-4 right-20 z-10">
        <div className="flex items-center mb-3">
          <span className="text-white font-semibold text-lg">@{username}</span>
        </div>
        <p className="text-white text-base leading-relaxed mb-2">
          {description}
        </p>
      </div>

      {/* Four action buttons on the right */}
      <div className="absolute right-4 bottom-40 flex flex-col items-center space-y-6">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex flex-col items-center transition-all duration-200 hover:scale-110 ${
            isLiked ? 'text-red-500' : 'text-white'
          }`}
        >
          <div className={`p-3 rounded-full backdrop-blur-sm ${
            isLiked ? 'bg-red-500/20' : 'bg-black/30'
          }`}>
            <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">{likesCount}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center text-white transition-all duration-200 hover:scale-110">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm">
            <MessageSquare size={28} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">{comments}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center text-white transition-all duration-200 hover:scale-110">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm">
            <Share size={28} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">Share</span>
        </button>

        {/* Search */}
        <button className="flex flex-col items-center text-white transition-all duration-200 hover:scale-110">
          <div className="p-3 rounded-full bg-orange-500/30 backdrop-blur-sm">
            <Search size={28} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">Search</span>
        </button>
      </div>

      {/* Gradient circle at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1">
          <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
