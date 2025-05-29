
import React, { useState } from 'react';
import { User, Shield, Lock, FileText, Globe, ChevronRight, ArrowLeft } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [language, setLanguage] = useState('en');

  const settingsItems = [
    {
      icon: User,
      title: language === 'en' ? 'Profile' : 'الملف الشخصي',
      subtitle: language === 'en' ? 'Edit your profile information' : 'تعديل معلومات الملف الشخصي',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Security' : 'الأمان',
      subtitle: language === 'en' ? 'Password, 2FA, and account security' : 'كلمة المرور والمصادقة الثنائية وأمان الحساب',
    },
    {
      icon: Lock,
      title: language === 'en' ? 'Privacy' : 'الخصوصية',
      subtitle: language === 'en' ? 'Control who can see your content' : 'التحكم في من يمكنه رؤية المحتوى الخاص بك',
    },
    {
      icon: FileText,
      title: language === 'en' ? 'Terms and Conditions' : 'الشروط والأحكام',
      subtitle: language === 'en' ? 'Read our terms of service' : 'اقرأ شروط الخدمة',
    },
    {
      icon: FileText,
      title: language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
      subtitle: language === 'en' ? 'How we handle your data' : 'كيف نتعامل مع بياناتك',
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
            {language === 'en' ? 'Settings' : 'الإعدادات'}
          </h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Language Selector */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <Globe className="w-5 h-5 text-pink-500" />
              <span className="text-white font-medium">
                {language === 'en' ? 'Language' : 'اللغة'}
              </span>
              <div></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg ${
                  language === 'en' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-2 rounded-lg ${
                  language === 'ar' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                العربية
              </button>
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
