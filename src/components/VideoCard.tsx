
import React, { useState } from 'react';
import { Heart, MessageSquare, Share, User } from 'lucide-react';

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
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
        <div className="text-white/50 text-6xl">🎥</div>
      </div>

      {/* Video Info Overlay */}
      <div className="absolute bottom-20 left-4 right-20 z-10">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-3">
            {profileImage ? (
              <img src={profileImage} alt={username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="text-white" size={20} />
            )}
          </div>
          <span className="text-white font-semibold text-lg">@{username}</span>
          {!isFollowingState && (
            <button
              onClick={handleFollow}
              className="ml-3 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200"
            >
              Follow
            </button>
          )}
        </div>
        <p className="text-white text-base leading-relaxed mb-2">
          {description}
        </p>
        <div className="flex items-center">
          <span className="text-gray-300 text-sm">♪ Original Audio</span>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
        <button
          onClick={handleLike}
          className={`flex flex-col items-center transition-all duration-200 hover:scale-110 ${
            isLiked ? 'text-pink-500' : 'text-white'
          }`}
        >
          <div className={`p-3 rounded-full backdrop-blur-sm ${
            isLiked ? 'bg-pink-500/20' : 'bg-black/30'
          }`}>
            <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">{likesCount}</span>
        </button>

        <button className="flex flex-col items-center text-white transition-all duration-200 hover:scale-110">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm">
            <MessageSquare size={28} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">{comments}</span>
        </button>

        <button className="flex flex-col items-center text-white transition-all duration-200 hover:scale-110">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm">
            <Share size={28} />
          </div>
          <span className="text-white text-sm font-semibold mt-1">Share</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
