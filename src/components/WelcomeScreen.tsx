
import React, { useState } from 'react';
import { Shield, Server, Smartphone, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onAccept: (storageType: 'cloud' | 'local') => void;
}

const WelcomeScreen = ({ onAccept }: WelcomeScreenProps) => {
  const [selectedStorage, setSelectedStorage] = useState<'cloud' | 'local' | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const handleContinue = () => {
    if (selectedStorage && acceptedPolicy) {
      onAccept(selectedStorage);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-xl p-6">
        {/* App Logo */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-lg inline-block mb-4">
            <h1 className="text-white text-3xl font-bold tracking-wider">YOU</h1>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">مرحباً بك في تطبيق YOU</h2>
        </div>

        {/* Welcome Message */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            أنت هنا المتحكم بنفسك وليس التطبيق، خصوصيتك تهمنا. يرجى اختيارك وضعية حفظ بياناتك الخاصة ولك طريقتين:
          </p>
        </div>

        {/* Storage Options */}
        <div className="space-y-4 mb-6">
          <button
            onClick={() => setSelectedStorage('cloud')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedStorage === 'cloud'
                ? 'border-pink-500 bg-pink-500/20'
                : 'border-gray-600 bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Server className="w-6 h-6 text-pink-500" />
              <div className="text-right flex-1">
                <h3 className="text-white font-semibold">التشفير والحفظ عندنا</h3>
                <p className="text-gray-400 text-sm">نحن مسؤولون عن حفظ البيانات وسريتها</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedStorage('local')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedStorage === 'local'
                ? 'border-pink-500 bg-pink-500/20'
                : 'border-gray-600 bg-gray-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-pink-500" />
              <div className="text-right flex-1">
                <h3 className="text-white font-semibold">الحفظ في جهازك</h3>
                <p className="text-gray-400 text-sm">أنت المسؤول عن البيانات وحفظها</p>
              </div>
            </div>
          </button>
        </div>

        {/* Notice */}
        <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-3 mb-6">
          <p className="text-purple-300 text-xs leading-relaxed">
            <strong>ملاحظة:</strong> استعمل البرنامج لإظهار إبداعك للناس وارتقِ بنفسك ولا تجعل التكنولوجيا تتحكم بك. تعرف على ناس تساعدك في الارتقاء فقد وُجدنا في هذا العالم لنساعد بعضنا البعض وليس العكس. نتمنى لك وقت ممتع 🙂
          </p>
        </div>

        {/* Policy Acceptance */}
        <label className="flex items-center space-x-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedPolicy}
            onChange={(e) => setAcceptedPolicy(e.target.checked)}
            className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
          />
          <span className="text-gray-300 text-sm">
            أوافق على سياسة الخصوصية وشروط الاستخدام
          </span>
        </label>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedStorage || !acceptedPolicy}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            selectedStorage && acceptedPolicy
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>متابعة</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
