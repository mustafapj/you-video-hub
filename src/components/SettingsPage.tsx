
import React, { useState } from 'react';
import { User, Shield, Lock, FileText, Globe, ChevronRight, ArrowLeft, Sun, Moon, Key, HelpCircle, MessageSquare } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [language, setLanguage] = useState('ar');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const settingsItems = [
    {
      icon: Key,
      title: language === 'ar' ? 'كلمة المرور' : 'Password',
      subtitle: language === 'ar' ? 'تغيير كلمة المرور' : 'Change your password',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'الأمان' : 'Security',
      subtitle: language === 'ar' ? 'المصادقة الثنائية وأمان الحساب' : '2FA and account security',
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'السياسة والخصوصية' : 'Privacy Policy',
      subtitle: language === 'ar' ? 'سياسة الخصوصية وشروط الاستخدام' : 'Privacy policy and terms',
    },
    {
      icon: HelpCircle,
      title: language === 'ar' ? 'من نحن' : 'About Us',
      subtitle: language === 'ar' ? 'معلومات عن التطبيق' : 'About the application',
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'تقديم ملاحظة' : 'Submit Feedback',
      subtitle: language === 'ar' ? 'أرسل لنا ملاحظاتك' : 'Send us your feedback',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-white/20">
          <button onClick={onBack} className="mr-4 p-2 rounded-full bg-white/10">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Day/Night Mode Toggle */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                {isDarkMode ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                <span className="text-white font-medium">
                  {language === 'ar' ? 'الوضع الليلي/النهاري' : 'Dark/Light Mode'}
                </span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isDarkMode ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isDarkMode ? 'transform translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium">
                {language === 'ar' ? 'اللغة' : 'Language'}
              </span>
              <div></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse ${
                    language === lang.code ? 'bg-cyan-500 text-white' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Items */}
          {settingsItems.map((item, index) => (
            <button
              key={index}
              className="w-full bg-white/10 rounded-lg p-4 flex items-center justify-between hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <item.icon className="w-6 h-6 text-cyan-400" />
                <div className="text-right">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-300 text-sm">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
