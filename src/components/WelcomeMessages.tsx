
import React, { useState } from 'react';
import { MessageSquare, UserPlus, UserMinus, Edit3, Save } from 'lucide-react';

const WelcomeMessages = () => {
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [goodbyeEnabled, setGoodbyeEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [messages, setMessages] = useState({
    welcome: "🎉 مرحباً {user} في مجموعة YOU!\n\nنحن سعداء لانضمامك إلينا. يرجى قراءة القوانين والتفاعل بإيجابية.\n\n💫 استمتع بوقتك معنا!",
    goodbye: "👋 وداعاً {user}\n\nنتمنى لك التوفيق في رحلتك القادمة!"
  });

  const [tempMessages, setTempMessages] = useState(messages);

  const handleSave = () => {
    setMessages(tempMessages);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMessages(messages);
    setIsEditing(false);
  };

  const variables = [
    { var: '{user}', desc: 'اسم العضو الجديد' },
    { var: '{username}', desc: 'اسم المستخدم (@username)' },
    { var: '{group}', desc: 'اسم المجموعة' },
    { var: '{membercount}', desc: 'عدد الأعضاء الحالي' },
    { var: '{date}', desc: 'التاريخ الحالي' },
    { var: '{time}', desc: 'الوقت الحالي' }
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <h2 className="text-white text-xl font-bold">الرسائل التلقائية</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isEditing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'إلغاء التعديل' : 'تعديل الرسائل'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Welcome Message */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserPlus className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">رسالة الترحيب</h3>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={welcomeEnabled}
                onChange={(e) => setWelcomeEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-gray-300 text-sm">مفعل</label>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            {isEditing ? (
              <textarea
                value={tempMessages.welcome}
                onChange={(e) => setTempMessages({...tempMessages, welcome: e.target.value})}
                className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="اكتب رسالة الترحيب..."
              />
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap">
                {messages.welcome}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-green-900/20 border border-green-600 rounded-lg p-3">
            <h4 className="text-green-400 font-medium mb-2">معاينة:</h4>
            <div className="text-gray-300 text-sm whitespace-pre-wrap">
              {messages.welcome
                .replace('{user}', 'أحمد محمد')
                .replace('{username}', '@ahmed_you')
                .replace('{group}', 'مجموعة YOU')
                .replace('{membercount}', '156')
                .replace('{date}', new Date().toLocaleDateString('ar'))
                .replace('{time}', new Date().toLocaleTimeString('ar'))
              }
            </div>
          </div>
        </div>

        {/* Goodbye Message */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserMinus className="w-5 h-5 text-red-400" />
              <h3 className="text-white font-semibold">رسالة التوديع</h3>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={goodbyeEnabled}
                onChange={(e) => setGoodbyeEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-gray-300 text-sm">مفعل</label>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            {isEditing ? (
              <textarea
                value={tempMessages.goodbye}
                onChange={(e) => setTempMessages({...tempMessages, goodbye: e.target.value})}
                className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="اكتب رسالة التوديع..."
              />
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap">
                {messages.goodbye}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-3">
            <h4 className="text-red-400 font-medium mb-2">معاينة:</h4>
            <div className="text-gray-300 text-sm whitespace-pre-wrap">
              {messages.goodbye
                .replace('{user}', 'أحمد محمد')
                .replace('{username}', '@ahmed_you')
                .replace('{group}', 'مجموعة YOU')
                .replace('{membercount}', '155')
                .replace('{date}', new Date().toLocaleDateString('ar'))
                .replace('{time}', new Date().toLocaleTimeString('ar'))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Variables Reference */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">المتغيرات المتاحة:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {variables.map((variable, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-3">
              <code className="text-blue-400 font-mono text-sm">{variable.var}</code>
              <p className="text-gray-300 text-xs mt-1">{variable.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-6 flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التغييرات</span>
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            إلغاء
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessages;
