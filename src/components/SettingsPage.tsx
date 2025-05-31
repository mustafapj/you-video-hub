
import React, { useState } from 'react';
import { User, Shield, Lock, FileText, Globe, ChevronRight, ArrowLeft } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [language, setLanguage] = useState('ar');

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const settingsItems = [
    {
      icon: User,
      title: language === 'ar' ? 'الملف الشخصي' : 'Profile',
      subtitle: language === 'ar' ? 'تعديل معلومات الملف الشخصي' : 'Edit your profile information',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'الأمان' : 'Security',
      subtitle: language === 'ar' ? 'كلمة المرور والمصادقة الثنائية وأمان الحساب' : 'Password, 2FA, and account security',
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'الخصوصية' : 'Privacy',
      subtitle: language === 'ar' ? 'التحكم في من يمكنه رؤية المحتوى الخاص بك' : 'Control who can see your content',
    },
    {
      icon: FileText,
      title: language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions',
      subtitle: language === 'ar' ? 'اقرأ شروط الخدمة' : 'Read our terms of service',
    },
    {
      icon: FileText,
      title: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
      subtitle: language === 'ar' ? 'كيف نتعامل مع بياناتك' : 'How we handle your data',
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-800">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Language Selector */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <Globe className="w-5 h-5 text-pink-500" />
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
                  className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                    language === lang.code ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'
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
              className="w-full bg-gray-900 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-6 h-6 text-pink-500" />
                <div className="text-left">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.subtitle}</p>
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
