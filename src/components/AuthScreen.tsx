
import React, { useState } from 'react';
import { User, Mail, Upload, Calendar, Globe } from 'lucide-react';

interface AuthScreenProps {
  storageType: 'cloud' | 'local';
  onAuthComplete: () => void;
}

const AuthScreen = ({ storageType, onAuthComplete }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
    birthDate: '',
    country: ''
  });

  const countries = [
    'السعودية', 'مصر', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان',
    'الأردن', 'لبنان', 'سوريا', 'العراق', 'المغرب', 'الجزائر', 'تونس',
    'ليبيا', 'السودان', 'اليمن', 'فلسطين'
  ];

  const generateUserID = () => {
    return 'YOU' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Generate unique user ID for new accounts
      const userID = generateUserID();
      console.log('Generated User ID:', userID);
      
      // Store user data based on selected storage type
      const userData = {
        ...formData,
        userID,
        storageType,
        createdAt: new Date().toISOString()
      };
      
      if (storageType === 'local') {
        localStorage.setItem('YOU_userData', JSON.stringify(userData));
      }
      // For cloud storage, this would be sent to the server
    }
    
    onAuthComplete();
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-lg inline-block mb-4">
            <h1 className="text-white text-2xl font-bold">YOU</h1>
          </div>
          <h2 className="text-white text-xl font-semibold">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            نوع التخزين: {storageType === 'cloud' ? 'السحابة' : 'الجهاز'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Registration fields */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    placeholder="الاسم الكامل"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="@username"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">تاريخ الميلاد (يجب أن تكون 18+ سنة)</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">الدولة</label>
                <div className="relative">
                  <Globe className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                  >
                    <option value="">اختر الدولة</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">صورة الملف الشخصي</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">اضغط لرفع الصورة</p>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
          </button>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-400 hover:text-pink-300 text-sm"
            >
              {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
