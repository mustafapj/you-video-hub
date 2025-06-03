
import React, { useState } from 'react';
import { Bot, MessageSquare, ArrowLeft } from 'lucide-react';
import BotChat from './BotChat';

const BotSystem = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <BotChat onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">بوت YOU</h1>
            <p className="text-white/80 text-lg">المساعد الذكي لإدارة المجموعات والقنوات</p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white text-sm">⭐ 5.0</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white text-sm">👥 1M+ مستخدم</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white text-sm">🤖 24/7 نشط</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="bg-blue-600/20 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">محادثة تفاعلية</h3>
            <p className="text-gray-400 text-sm mb-4">تفاعل مع البوت من خلال محادثة طبيعية مثل تليجرام</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="bg-green-600/20 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bot className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">بوتات متنوعة</h3>
            <p className="text-gray-400 text-sm mb-4">إنشاء بوتات للمجموعات، القنوات، الموسيقى والألعاب</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="bg-purple-600/20 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">ذكاء اصطناعي</h3>
            <p className="text-gray-400 text-sm mb-4">تقنيات متقدمة للحماية والتفاعل الذكي</p>
          </div>
        </div>

        {/* Start Chat Button */}
        <div className="text-center">
          <button
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <MessageSquare className="w-6 h-6" />
            <span>بدء المحادثة مع البوت</span>
          </button>
          <p className="text-gray-400 text-sm mt-3">ابدأ بالضغط على /start لتفعيل البوت</p>
        </div>

        {/* Features List */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h2 className="text-white text-xl font-bold mb-6 text-center">الميزات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>إدارة شاملة للمجموعات</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>نظام حماية متقدم</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>رسائل ترحيب مخصصة</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>إحصائيات مفصلة</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>بوت موسيقى متكامل</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>نظام ألعاب تفاعلي</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>دعم متعدد اللغات</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <span className="text-green-400">✅</span>
              <span>تشغيل 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSystem;
