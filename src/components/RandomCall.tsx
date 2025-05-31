
import React, { useState } from 'react';
import { Phone, PhoneOff, Users, Globe, MapPin } from 'lucide-react';

const RandomCall = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('any');

  const regions = [
    { key: 'any', label: 'أي مكان', flag: '🌍' },
    { key: 'asia', label: 'آسيا', flag: '🌏' },
    { key: 'africa', label: 'أفريقيا', flag: '🌍' },
    { key: 'europe', label: 'أوروبا', flag: '🌍' },
    { key: 'australia', label: 'أستراليا', flag: '🇦🇺' },
    { key: 'north_america', label: 'أمريكا الشمالية', flag: '🌎' },
    { key: 'south_america', label: 'أمريكا الجنوبية', flag: '🌎' }
  ];

  const handleCall = () => {
    setIsConnecting(true);
    setTimeout(() => setIsConnecting(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Free Call Notice */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold mb-2">🆓 مكالمات مجانية</h2>
              <p className="text-white/80 text-sm">جميع المكالمات العشوائية مجانية للجميع</p>
            </div>
          </div>
        </div>

        {/* Region Selection */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            اختر المنطقة للاتصال
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {regions.map(({ key, label, flag }) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  selectedRegion === key
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-gray-600 bg-gray-800'
                }`}
              >
                <div className="text-2xl mb-1">{flag}</div>
                <p className="text-white text-sm font-medium">{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Safety Rules */}
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 mb-6">
          <h3 className="text-red-400 font-semibold mb-3 flex items-center">
            ⚠️ قواعد السلامة
          </h3>
          <ul className="text-red-300 text-sm space-y-1">
            <li>• ممنوع شرب الكحول أو التدخين</li>
            <li>• ممنوع استخدام الألفاظ النابية</li>
            <li>• ممنوع كشف المناطق الحساسة</li>
            <li>• يجب أن تكون مهذباً ومحترماً</li>
          </ul>
        </div>

        {/* Call Button */}
        <button
          onClick={handleCall}
          disabled={isConnecting}
          className={`w-full py-4 rounded-lg flex items-center justify-center space-x-3 transition-all ${
            isConnecting
              ? 'bg-yellow-500'
              : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
          }`}
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white font-semibold">جاري الاتصال...</span>
            </>
          ) : (
            <>
              <Phone className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">ابدأ مكالمة عشوائية مجانية</span>
            </>
          )}
        </button>

        {/* Selected Region Display */}
        {selectedRegion !== 'any' && (
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              سيتم الاتصال بأشخاص من: <span className="text-pink-400 font-medium">
                {regions.find(r => r.key === selectedRegion)?.label}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomCall;
