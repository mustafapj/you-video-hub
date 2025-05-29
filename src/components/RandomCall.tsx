
import React, { useState } from 'react';
import { Phone, PhoneOff, Users, Zap, Crown, Star } from 'lucide-react';

const RandomCall = () => {
  const [points, setPoints] = useState(80);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'any' | 'male' | 'female'>('any');

  const pointsPackages = [
    { calls: 50, price: 50, popular: false },
    { calls: 100, price: 75, popular: true },
    { calls: 'Unlimited', price: 150, popular: false, monthly: true }
  ];

  const handleCall = () => {
    if (selectedGender !== 'any' && points < 40) {
      alert('Not enough points for gender-specific calls!');
      return;
    }
    
    setIsConnecting(true);
    if (selectedGender !== 'any') {
      setPoints(points - 40);
    }
    
    setTimeout(() => setIsConnecting(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Points Display */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Available Points</p>
              <p className="text-white text-3xl font-bold">{points}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-white/60 text-xs mt-2">Daily points: 80 | Gender calls: 40 points each</p>
        </div>

        {/* Gender Selection */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-4">Call Preference</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'any', label: 'Anyone', icon: Users, cost: 'Free' },
              { key: 'male', label: 'Male', icon: Users, cost: '40 pts' },
              { key: 'female', label: 'Female', icon: Users, cost: '40 pts' }
            ].map(({ key, label, icon: Icon, cost }) => (
              <button
                key={key}
                onClick={() => setSelectedGender(key as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedGender === key
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-gray-600 bg-gray-800'
                }`}
              >
                <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-400 text-xs">{cost}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Call Button */}
        <button
          onClick={handleCall}
          disabled={isConnecting}
          className={`w-full py-4 rounded-lg flex items-center justify-center space-x-3 transition-all ${
            isConnecting
              ? 'bg-yellow-500'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
          }`}
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white font-semibold">Connecting...</span>
            </>
          ) : (
            <>
              <Phone className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">Start Random Call</span>
            </>
          )}
        </button>

        {/* Points Packages */}
        <div className="mt-8">
          <h3 className="text-white font-semibold mb-4">Buy Points</h3>
          <div className="space-y-3">
            {pointsPackages.map((pkg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 relative ${
                  pkg.popular
                    ? 'border-pink-500 bg-pink-500/10'
                    : 'border-gray-600 bg-gray-800'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {pkg.calls} {pkg.monthly ? 'Monthly' : 'Calls'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {pkg.monthly ? 'Unlimited calls for 30 days' : `${pkg.calls} gender-specific calls`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-400 font-bold text-xl">${pkg.price}</p>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm mt-2 hover:bg-pink-600 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCall;
