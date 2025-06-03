
import React, { useState } from 'react';
import { User, Mail, Upload, Calendar, Globe, Phone } from 'lucide-react';

interface AuthScreenProps {
  storageType: 'cloud' | 'local';
  onAuthComplete: () => void;
}

const AuthScreen = ({ storageType, onAuthComplete }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
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

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Validate password for registration
      if (!validatePassword(formData.password)) {
        alert('كلمة المرور يجب أن تتكون من 8 أرقام أو أكثر');
        return;
      }
      
      // Generate unique user ID for new accounts
      const userID = generateUserID();
      console.log('Generated User ID:', userID);
      
      // Store user data based on selected storage type
      const userData = {
        ...formData,
        userID,
        storageType,
        authMethod,
        createdAt: new Date().toISOString()
      };
      
      if (storageType === 'local') {
        localStorage.setItem('YOU_userData', JSON.stringify(userData));
      }
      // For cloud storage, this would be sent to the server
    } else {
      // Validate password for login
      if (!validatePassword(formData.password)) {
        alert('كلمة المرور يجب أن تتكون من 8 أرقام أو أكثر');
        return;
      }
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

        {/* Authentication Method Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'phone' 
                ? 'bg-pink-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            رقم الهاتف
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'email' 
                ? 'bg-pink-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            البريد الإلكتروني
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Primary Auth Field */}
          {authMethod === 'phone' ? (
            <div>
              <label className="block text-gray-300 text-sm mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="+966501234567"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني (اختياري)</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="example@email.com"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              كلمة المرور (8 أرقام أو أكثر)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="••••••••"
              minLength={8}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              يجب أن تتكون كلمة المرور من 8 أرقام على الأقل
            </p>
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
