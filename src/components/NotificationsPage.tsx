
import React from 'react';
import { Heart, MessageSquare, User, Bell } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'sarah_designs',
      action: 'liked your video',
      time: '2m ago',
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 2,
      type: 'comment',
      user: 'mike_creator',
      action: 'commented on your video',
      time: '5m ago',
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      id: 3,
      type: 'follow',
      user: 'artist_jenny',
      action: 'started following you',
      time: '1h ago',
      icon: User,
      color: 'text-green-500',
    },
    {
      id: 4,
      type: 'like',
      user: 'tech_guru',
      action: 'liked your video',
      time: '3h ago',
      icon: Heart,
      color: 'text-pink-500',
    },
  ];

  return (
    <div className="bg-black min-h-screen pt-4 pb-20">
      <div className="px-4">
        <h1 className="text-white text-2xl font-bold mb-6">Notifications</h1>
        
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className="flex items-center p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-200"
              >
                <div className={`p-2 rounded-full bg-black/30 mr-4 ${notification.color}`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-white font-semibold">@{notification.user}</span>
                    <span className="text-gray-300 ml-2">{notification.action}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{notification.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
