
import React from 'react';
import VideoCard from './VideoCard';

const VideoFeed = () => {
  const sampleVideos = [
    {
      id: '1',
      username: 'alex_creates',
      description: '🎨 Creating digital art with AI! This process is absolutely mind-blowing #art #ai #creative',
      likes: 12400,
      comments: 234,
      isFollowing: false,
    },
    {
      id: '2',
      username: 'foodie_adventures',
      description: '🍜 Making the most satisfying ramen at 3AM hits different #ramen #cooking #midnight',
      likes: 8900,
      comments: 156,
      isFollowing: true,
    },
    {
      id: '3',
      username: 'tech_wizard',
      description: '🚀 Building my first mobile app! Who else is learning to code? #programming #tech #coding',
      likes: 15600,
      comments: 412,
      isFollowing: false,
    },
    {
      id: '4',
      username: 'music_producer',
      description: '🎵 Live beat making session! Drop your favorite genre in comments 🔥',
      likes: 9800,
      comments: 187,
      isFollowing: true,
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {sampleVideos.map((video) => (
        <div key={video.id} className="snap-start">
          <VideoCard {...video} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
