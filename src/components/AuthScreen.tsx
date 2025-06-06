
import React, { useState } from 'react';
import { User, Mail, Upload, Calendar, Globe, Phone, Shield, CheckCircle } from 'lucide-react';

interface AuthScreenProps {
  storageType: 'cloud' | 'local';
  onAuthComplete: () => void;
}

const AuthScreen = ({ storageType, onAuthComplete }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    fullName: '',
    birthDate: '',
    country: '',
    profileImage: null as File | null
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

  const validateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 18;
  };

  const sendVerificationCode = () => {
    // Simulate sending verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Verification code sent: ${code}`);
    
    if (authMethod === 'phone') {
      console.log(`SMS sent to ${formData.phoneNumber}: Your verification code is ${code}`);
    } else {
      console.log(`Email sent to ${formData.email}: Your verification code is ${code}`);
    }
    
    setShowVerification(true);
  };

  const verifyCode = () => {
    // Simulate verification
    if (verificationCode.length === 6) {
      console.log('Verification successful');
      completeRegistration();
    } else {
      alert('رمز التحقق غير صحيح');
    }
  };

  const completeRegistration = () => {
    const userID = generateUserID();
    
    // Enhanced data storage following Facebook's approach
    const userData = {
      // Basic Profile Information
      userID,
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      country: formData.country,
      
      // Account Settings
      storageType,
      authMethod,
      isVerified: true,
      accountType: 'personal',
      
      // Privacy Settings (Facebook-like defaults)
      privacySettings: {
        profileVisibility: 'public',
        phoneVisibility: 'friends',
        emailVisibility: 'private',
        birthDateVisibility: 'friends',
        friendsListVisibility: 'friends',
        allowFriendRequests: true,
        allowMessages: 'everyone',
        searchByEmail: true,
        searchByPhone: false,
        adPersonalization: true,
        dataCollection: true,
        locationTracking: false
      },
      
      // Activity Data
      activityData: {
        lastLoginIP: '0.0.0.0',
        loginHistory: [],
        deviceInfo: navigator.userAgent,
        searchHistory: [],
        interactionHistory: [],
        contentPreferences: []
      },
      
      // Content & Engagement
      contentData: {
        postsCount: 0,
        likesGiven: [],
        commentsHistory: [],
        shareHistory: [],
        savedPosts: [],
        blockedUsers: [],
        reportedContent: []
      },
      
      // Timestamps
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      
      // Consent & Legal
      termsAccepted: true,
      privacyPolicyAccepted: true,
      communityGuidelinesAccepted: true,
      dataProcessingConsent: true,
      marketingConsent: false,
      consentTimestamp: new Date().toISOString()
    };
    
    // Store data based on storage type
    if (storageType === 'local') {
      // Local storage with encryption simulation
      const encryptedData = btoa(JSON.stringify(userData));
      localStorage.setItem('YOU_userData', encryptedData);
      localStorage.setItem('YOU_userSession', JSON.stringify({
        userID,
        sessionToken: Math.random().toString(36),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }));
    } else {
      // Cloud storage simulation
      console.log('Sending to cloud storage:', userData);
    }
    
    // Log data collection for transparency
    console.log('Data collected and stored according to privacy policy:', {
      personalData: ['name', 'email', 'phone', 'birthDate', 'country'],
      technicalData: ['device', 'IP', 'userAgent'],
      behaviorData: ['interactions', 'preferences', 'activity'],
      consentGiven: userData.dataProcessingConsent
    });
    
    onAuthComplete();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Validate all fields for registration
      if (!validatePassword(formData.password)) {
        alert('كلمة المرور يجب أن تتكون من 8 أرقام أو أكثر');
        return;
      }
      
      if (!validateAge(formData.birthDate)) {
        alert('يجب أن تكون 18 سنة أو أكثر للتسجيل');
        return;
      }
      
      if (authMethod === 'phone' && !formData.phoneNumber) {
        alert('رقم الهاتف مطلوب');
        return;
      }
      
      // Send verification code
      sendVerificationCode();
    } else {
      // Login validation
      if (!validatePassword(formData.password)) {
        alert('كلمة المرور يجب أن تتكون من 8 أرقام أو أكثر');
        return;
      }
      
      onAuthComplete();
    }
  };

  if (showVerification) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-6">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-white text-xl font-semibold">تحقق من هويتك</h2>
            <p className="text-gray-400 text-sm mt-2">
              تم إرسال رمز التحقق إلى {authMethod === 'phone' ? formData.phoneNumber : formData.email}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">رمز التحقق (6 أرقام)</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg py-3 px-4 text-center text-2xl tracking-widest focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <button
              onClick={verifyCode}
              disabled={verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              تحقق من الرمز
            </button>

            <button
              onClick={sendVerificationCode}
              className="w-full text-pink-400 hover:text-pink-300 text-sm py-2"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Data Collection Notice */}
        {!isLogin && (
          <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-blue-400 mb-1">حماية البيانات</p>
                <p>نحن نجمع ونحفظ بياناتك وفقاً لسياسة الخصوصية. البيانات محمية بالتشفير ولن نشاركها مع طرف ثالث بدون موافقتك.</p>
              </div>
            </div>
          </div>
        )}

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
              <label className="block text-gray-300 text-sm mb-2">رقم الهاتف *</label>
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
              <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني *</label>
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
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              كلمة المرور (8 أرقام أو أكثر) *
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
          </div>

          {/* Registration fields */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الاسم الكامل *</label>
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
                <label className="block text-gray-300 text-sm mb-2">اسم المستخدم *</label>
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
                <label className="block text-gray-300 text-sm mb-2">تاريخ الميلاد (يجب أن تكون 18+ سنة) *</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">الدولة *</label>
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

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <label className="flex items-start space-x-3 text-sm text-gray-300">
                  <input type="checkbox" required className="mt-1 rounded bg-gray-800 border-gray-600" />
                  <span>أوافق على <button type="button" className="text-pink-400 hover:underline">الشروط والأحكام</button> و <button type="button" className="text-pink-400 hover:underline">سياسة الخصوصية</button> *</span>
                </label>
                
                <label className="flex items-start space-x-3 text-sm text-gray-300">
                  <input type="checkbox" required className="mt-1 rounded bg-gray-800 border-gray-600" />
                  <span>أوافق على جمع ومعالجة بياناتي الشخصية وفقاً لسياسة الخصوصية *</span>
                </label>
                
                <label className="flex items-start space-x-3 text-sm text-gray-300">
                  <input type="checkbox" className="mt-1 rounded bg-gray-800 border-gray-600" />
                  <span>أوافق على تلقي رسائل تسويقية وإشعارات (اختياري)</span>
                </label>
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
