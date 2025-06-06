import React, { useState, useEffect } from 'react';
import { Bot, Eye, EyeOff, Save, ArrowLeft, Info, Settings, Zap, Copy } from 'lucide-react';

interface BotCreationFormProps {
  onBack: () => void;
  botType: string;
}

const BotCreationForm = ({ onBack, botType }: BotCreationFormProps) => {
  const [showToken, setShowToken] = useState(false);
  const [formData, setFormData] = useState({
    botName: '',
    botUsername: '',
    botToken: '',
    description: '',
    isUserBot: false,
    autoStart: true,
    logErrors: true,
    enableWebhook: false,
    allowedUsers: '',
    adminUsers: '',
    features: {
      antiSpam: true,
      welcomeMessage: true,
      autoModeration: true,
      statistics: true,
      customCommands: true
    }
  });

  // Generate Telegram-style token when component mounts
  useEffect(() => {
    const generateTelegramToken = () => {
      // Bot ID: 10 digit number starting with high digits
      const botId = Math.floor(Math.random() * 2000000000) + 1000000000;
      
      // Secret part: 35 characters (mix of letters, numbers, and some special chars)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
      let secret = '';
      for (let i = 0; i < 35; i++) {
        secret += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      return `${botId}:${secret}`;
    };

    setFormData(prev => ({
      ...prev,
      botToken: generateTelegramToken()
    }));
  }, []);

  const getBotTypeInfo = () => {
    const types = {
      'group_bot': {
        title: 'بوت إدارة المجموعات',
        icon: '👮‍♂️',
        description: 'بوت متقدم لإدارة المجموعات مع خصائص الحماية والتحكم'
      },
      'channel_bot': {
        title: 'بوت القنوات',
        icon: '📢',
        description: 'بوت لإدارة القنوات والنشر المجدول'
      },
      'music_bot': {
        title: 'بوت الموسيقى',
        icon: '🎵',
        description: 'بوت تشغيل الموسيقى في المكالمات الصوتية'
      },
      'game_bot': {
        title: 'بوت الألعاب',
        icon: '🎮',
        description: 'بوت ألعاب تفاعلية ومسابقات'
      },
      'business_bot': {
        title: 'بوت الأعمال',
        icon: '💰',
        description: 'بوت لإدارة الأعمال والمبيعات'
      }
    };
    return types[botType as keyof typeof types] || types.group_bot;
  };

  const botInfo = getBotTypeInfo();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Bot Creation Data:', formData);
    // هنا يمكن إضافة منطق حفظ البيانات
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="text-2xl">{botInfo.icon}</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">{botInfo.title}</h1>
              <p className="text-white/80">{botInfo.description}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* معلومات البوت الأساسية */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              معلومات البوت الأساسية
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">اسم البوت *</label>
                <input
                  type="text"
                  value={formData.botName}
                  onChange={(e) => setFormData({...formData, botName: e.target.value})}
                  placeholder="مثال: بوت إدارة المجموعة"
                  className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">معرف البوت *</label>
                <input
                  type="text"
                  value={formData.botUsername}
                  onChange={(e) => setFormData({...formData, botUsername: e.target.value})}
                  placeholder="@MyAwesomeBot"
                  className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-300 text-sm mb-2">
                توكن البوت (نمط تليجرام - تم إنشاؤه تلقائياً)
              </label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  value={formData.botToken}
                  readOnly
                  className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 pr-20 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.botToken)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="نسخ التوكن"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title={showToken ? "إخفاء التوكن" : "إظهار التوكن"}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="mt-2 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <p className="text-blue-400 text-xs flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  هذا التوكن يستخدم نفس صيغة تليجرام: معرف البوت : الرمز السري (10 أرقام : 35 حرف)
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-300 text-sm mb-2">وصف البوت</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="وصف مختصر عن وظائف البوت..."
                className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>
          </div>

          {/* نوع البوت والإعدادات */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              إعدادات البوت
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">نوع البوت (UserBot)</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isUserBot}
                      onChange={(e) => setFormData({...formData, isUserBot: e.target.checked})}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">تشغيل تلقائي</span>
                  <input
                    type="checkbox"
                    checked={formData.autoStart}
                    onChange={(e) => setFormData({...formData, autoStart: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">تسجيل الأخطاء</span>
                  <input
                    type="checkbox"
                    checked={formData.logErrors}
                    onChange={(e) => setFormData({...formData, logErrors: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">تفعيل Webhook</span>
                  <input
                    type="checkbox"
                    checked={formData.enableWebhook}
                    onChange={(e) => setFormData({...formData, enableWebhook: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">المستخدمين المسموحين</label>
                  <input
                    type="text"
                    value={formData.allowedUsers}
                    onChange={(e) => setFormData({...formData, allowedUsers: e.target.value})}
                    placeholder="@user1, @user2, 123456789"
                    className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">المدراء</label>
                  <input
                    type="text"
                    value={formData.adminUsers}
                    onChange={(e) => setFormData({...formData, adminUsers: e.target.value})}
                    placeholder="@admin1, @admin2"
                    className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* الميزات المتقدمة */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              الميزات المتقدمة
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">مكافحة السبام</span>
                <input
                  type="checkbox"
                  checked={formData.features.antiSpam}
                  onChange={(e) => setFormData({
                    ...formData, 
                    features: {...formData.features, antiSpam: e.target.checked}
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">رسائل الترحيب</span>
                <input
                  type="checkbox"
                  checked={formData.features.welcomeMessage}
                  onChange={(e) => setFormData({
                    ...formData, 
                    features: {...formData.features, welcomeMessage: e.target.checked}
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">الإشراف التلقائي</span>
                <input
                  type="checkbox"
                  checked={formData.features.autoModeration}
                  onChange={(e) => setFormData({
                    ...formData, 
                    features: {...formData.features, autoModeration: e.target.checked}
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">الإحصائيات</span>
                <input
                  type="checkbox"
                  checked={formData.features.statistics}
                  onChange={(e) => setFormData({
                    ...formData, 
                    features: {...formData.features, statistics: e.target.checked}
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">الأوامر المخصصة</span>
                <input
                  type="checkbox"
                  checked={formData.features.customCommands}
                  onChange={(e) => setFormData({
                    ...formData, 
                    features: {...formData.features, customCommands: e.target.checked}
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>إنشاء البوت</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BotCreationForm;
