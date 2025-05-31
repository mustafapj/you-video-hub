
import React, { useState } from 'react';
import { Terminal, Copy, Play, Zap } from 'lucide-react';

const BotCommands = () => {
  const [selectedCategory, setSelectedCategory] = useState('moderation');

  const commandCategories = {
    moderation: {
      title: 'أوامر الإدارة',
      commands: [
        { command: '/ban', description: 'حظر عضو من المجموعة', usage: '/ban @username [السبب]' },
        { command: '/kick', description: 'طرد عضو من المجموعة', usage: '/kick @username [السبب]' },
        { command: '/mute', description: 'كتم عضو لفترة محددة', usage: '/mute @username [المدة] [السبب]' },
        { command: '/unmute', description: 'إلغاء كتم العضو', usage: '/unmute @username' },
        { command: '/warn', description: 'إعطاء تحذير لعضو', usage: '/warn @username [السبب]' },
        { command: '/unwarn', description: 'إزالة تحذير من عضو', usage: '/unwarn @username' },
      ]
    },
    info: {
      title: 'أوامر المعلومات',
      commands: [
        { command: '/info', description: 'عرض معلومات العضو', usage: '/info @username' },
        { command: '/stats', description: 'إحصائيات المجموعة', usage: '/stats' },
        { command: '/rules', description: 'عرض قوانين المجموعة', usage: '/rules' },
        { command: '/help', description: 'عرض قائمة الأوامر', usage: '/help' },
      ]
    },
    utility: {
      title: 'أوامر مفيدة',
      commands: [
        { command: '/pin', description: 'تثبيت رسالة', usage: '/pin [الرسالة أو رد على رسالة]' },
        { command: '/unpin', description: 'إلغاء تثبيت الرسالة', usage: '/unpin' },
        { command: '/delete', description: 'حذف رسالة', usage: '/delete [رد على الرسالة]' },
        { command: '/purge', description: 'حذف عدة رسائل', usage: '/purge [العدد]' },
      ]
    }
  };

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Terminal className="w-6 h-6 text-blue-400" />
        <h2 className="text-white text-xl font-bold">أوامر البوت</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-6">
        {Object.entries(commandCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Commands List */}
      <div className="space-y-4">
        {commandCategories[selectedCategory as keyof typeof commandCategories].commands.map((cmd, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <code className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded font-mono">
                  {cmd.command}
                </code>
                <span className="text-white font-medium">{cmd.description}</span>
              </div>
              <button
                onClick={() => copyCommand(cmd.usage)}
                className="text-gray-400 hover:text-white transition-colors"
                title="نسخ الأمر"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-gray-400 text-sm">
              <span className="font-medium">الاستخدام: </span>
              <code className="bg-gray-700 px-2 py-1 rounded">{cmd.usage}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold">إجراءات سريعة</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
            تفعيل الحماية التلقائية
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            إعداد رسائل الترحيب
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotCommands;
