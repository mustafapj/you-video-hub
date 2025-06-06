
import React, { useState } from 'react';
import { Bot, Plus, Settings, MessageSquare, List, Trash2, Edit, ArrowLeft } from 'lucide-react';
import BotCreationForm from './BotCreationForm';

const BotFather = () => {
  const [currentView, setCurrentView] = useState<'main' | 'create' | 'list' | 'settings'>('main');
  const [selectedBotType, setSelectedBotType] = useState('');

  const [userBots] = useState([
    {
      id: 1,
      name: 'بوت الإدارة الخاص بي',
      username: '@MyGroupBot',
      token: '1234567890:AAEhBfhgbjgghgfgwrgtw4t4tergERG',
      type: 'group_bot',
      status: 'active',
      users: 150
    },
    {
      id: 2,
      name: 'بوت الموسيقى',
      username: '@MyMusicBot', 
      token: '2345678901:BBFhgifhgirgregergregegerg',
      type: 'music_bot',
      status: 'inactive',
      users: 75
    }
  ]);

  const botTypes = [
    {
      id: 'group_bot',
      name: 'بوت إدارة المجموعات',
      icon: '👮‍♂️',
      description: 'بوت متقدم لإدارة المجموعات مع خصائص الحماية والتحكم الكامل',
      features: ['مكافحة السبام', 'الحماية من الروابط', 'إدارة الأعضاء', 'نظام التحذيرات']
    },
    {
      id: 'channel_bot', 
      name: 'بوت إدارة القنوات',
      icon: '📢',
      description: 'بوت لإدارة القنوات والنشر المجدول والإحصائيات',
      features: ['النشر المجدول', 'إحصائيات المشاهدة', 'إدارة المحتوى', 'التفاعلات']
    },
    {
      id: 'music_bot',
      name: 'بوت الموسيقى',
      icon: '🎵', 
      description: 'بوت تشغيل الموسيقى في المكالمات الصوتية مع قوائم التشغيل',
      features: ['تشغيل من يوتيوب', 'قوائم التشغيل', 'التحكم بالصوت', 'طلب الأغاني']
    },
    {
      id: 'game_bot',
      name: 'بوت الألعاب',
      icon: '🎮',
      description: 'بوت ألعاب تفاعلية ومسابقات وتحديات يومية',
      features: ['ألعاب تفاعلية', 'مسابقات', 'نقاط وجوائز', 'تحديات يومية']
    },
    {
      id: 'business_bot',
      name: 'بوت الأعمال',
      icon: '💰',
      description: 'بوت لإدارة الأعمال والمبيعات ودعم العملاء',
      features: ['دعم العملاء', 'إدارة الطلبات', 'نظام الدفع', 'إحصائيات المبيعات']
    }
  ];

  if (currentView === 'create' && selectedBotType) {
    return (
      <BotCreationForm 
        onBack={() => setCurrentView('main')}
        botType={selectedBotType}
      />
    );
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">بوت فادر</h1>
              <p className="text-white/80 text-lg">أنشئ وأدر بوتاتك الخاصة بسهولة</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-white text-xl font-bold">{userBots.length}</div>
              <div className="text-white/80 text-sm">البوتات النشطة</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-white text-xl font-bold">
                {userBots.reduce((sum, bot) => sum + bot.users, 0)}
              </div>
              <div className="text-white/80 text-sm">إجمالي المستخدمين</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-white text-xl font-bold">24/7</div>
              <div className="text-white/80 text-sm">تشغيل مستمر</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {currentView === 'main' && (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setCurrentView('create')}
                className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg text-white font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-lg transition-all"
              >
                <Plus className="w-6 h-6" />
                <span>إنشاء بوت جديد</span>
              </button>
              
              <button
                onClick={() => setCurrentView('list')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-lg transition-all"
              >
                <List className="w-6 h-6" />
                <span>إدارة البوتات</span>
              </button>
            </div>

            {/* أنواع البوتات المتاحة */}
            <div className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-6">أنواع البوتات المتاحة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {botTypes.map((botType) => (
                  <div
                    key={botType.id}
                    className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedBotType(botType.id);
                      setCurrentView('create');
                    }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{botType.icon}</div>
                      <div>
                        <h3 className="text-white text-xl font-bold">{botType.name}</h3>
                        <p className="text-gray-400 text-sm">{botType.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {botType.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-green-400 text-sm">✅</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* البوتات الحالية */}
            {userBots.length > 0 && (
              <div>
                <h2 className="text-white text-2xl font-bold mb-6">بوتاتك الحالية</h2>
                <div className="space-y-4">
                  {userBots.map((bot) => (
                    <div key={bot.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600/20 p-3 rounded-lg">
                            <Bot className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg font-bold">{bot.name}</h3>
                            <p className="text-gray-400">{bot.username}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                bot.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {bot.status === 'active' ? 'نشط' : 'متوقف'}
                              </span>
                              <span className="text-gray-400 text-sm">{bot.users} مستخدم</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 p-2">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-green-400 hover:text-green-300 p-2">
                            <MessageSquare className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-300 p-2">
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {currentView === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">إدارة البوتات</h2>
              <button
                onClick={() => setCurrentView('main')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {userBots.map((bot) => (
                <div key={bot.id} className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white text-lg font-bold">{bot.name}</h3>
                      <p className="text-gray-400">{bot.username}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                        تعديل
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-sm mb-1">التوكن:</p>
                    <code className="text-green-400 text-sm font-mono break-all">{bot.token}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotFather;
