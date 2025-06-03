
import React, { useState } from 'react';
import { MessageCircle, Bot, Users, Search, Plus, Settings } from 'lucide-react';
import BotSystem from './BotSystem';

const MessagesPage = () => {
  const [showBot, setShowBot] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Ahmed Ali',
      lastMessage: 'مرحباً، كيف الحال؟',
      time: '12:30',
      unread: 2,
      avatar: '👤',
      online: true
    },
    {
      id: 2,
      name: 'مجموعة الأصدقاء',
      lastMessage: 'سأكون متأخراً قليلاً',
      time: '11:45',
      unread: 0,
      avatar: '👥',
      online: false
    },
    {
      id: 3,
      name: 'قناة الأخبار',
      lastMessage: 'أخبار جديدة: ...',
      time: '10:20',
      unread: 5,
      avatar: '📢',
      online: false
    }
  ];

  if (showBot) {
    return <BotSystem />;
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-bold">المحادثات</h1>
          <div className="flex items-center space-x-3">
            <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Plus className="w-6 h-6" />
            </button>
            <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في المحادثات..."
            className="w-full bg-white/20 text-white placeholder-gray-300 rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-white/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Bot Section */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">بوت YOU الذكي</h2>
                <p className="text-white/80 text-sm">مساعدك لإدارة المجموعات والقنوات</p>
              </div>
            </div>
            <button
              onClick={() => setShowBot(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              بدء المحادثة
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          <h3 className="text-gray-400 text-sm font-medium mb-3">المحادثات الأخيرة</h3>
          
          {conversations
            .filter(conv => 
              conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((conversation) => (
              <div
                key={conversation.id}
                className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full text-white text-lg">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold">{conversation.name}</h4>
                      <span className="text-gray-400 text-sm">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm truncate max-w-48">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Empty State */}
        {conversations.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-400 text-lg font-medium mb-2">لا توجد محادثات</h3>
            <p className="text-gray-500 text-sm">ابدأ محادثة جديدة أو تحدث مع البوت</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
