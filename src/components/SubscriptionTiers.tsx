
import React, { useState } from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';

const SubscriptionTiers = () => {
  const [selectedTier, setSelectedTier] = useState('basic');

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Standard access',
        '15% discount on gifts',
        'Basic video quality',
        '3 uploads per day',
        'Standard support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$9.99/mo',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      features: [
        'Everything in Basic',
        '15% discount on gifts',
        'HD video quality',
        '10 uploads per day',
        'Priority support',
        'Custom filters'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99/mo',
      icon: Crown,
      color: 'from-pink-500 to-purple-600',
      features: [
        'Everything in Standard',
        'Only 5% discount on gifts',
        '4K video quality',
        'Unlimited uploads',
        'Premium support',
        'Advanced analytics',
        'Monetization features'
      ]
    }
  ];

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
          <p className="text-gray-400">Unlock premium features and enhance your MJ experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedTier === tier.id
                    ? 'border-pink-500 bg-pink-500/10'
                    : 'border-gray-700 bg-gray-900'
                } ${tier.popular ? 'scale-105' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-3xl font-bold text-white">{tier.price}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    selectedTier === tier.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tier.id === 'basic' ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
