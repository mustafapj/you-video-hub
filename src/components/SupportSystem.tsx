
import React, { useState } from 'react';
import { Send, HelpCircle, Bug, DollarSign, Shield } from 'lucide-react';

const SupportSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'technical', label: 'Technical Issues', icon: Bug, color: 'bg-red-500' },
    { id: 'abuse', label: 'Report Abuse', icon: Shield, color: 'bg-orange-500' },
    { id: 'monetization', label: 'Monetization', icon: DollarSign, color: 'bg-green-500' },
    { id: 'general', label: 'General Help', icon: HelpCircle, color: 'bg-blue-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !message.trim()) return;
    
    // Here you would typically send the support request
    alert('Support request submitted successfully!');
    setMessage('');
    setSelectedCategory('');
  };

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-gray-400">Get help from the MJ team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-white font-semibold mb-4">What do you need help with?</label>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id
                        ? 'border-pink-500 bg-pink-500/20'
                        : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">{category.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-white font-semibold mb-2">Describe your issue</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide details about your issue..."
              rows={6}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedCategory || !message.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            <Send className="w-5 h-5" />
            <span>Send Support Request</span>
          </button>
        </form>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I get daily points for random calls?",
                a: "You receive 80 points daily automatically. These reset every 24 hours."
              },
              {
                q: "What's the difference between subscription tiers?",
                a: "Basic is free, Standard ($9.99) offers more uploads and HD quality, Pro ($19.99) has unlimited uploads and monetization features."
              },
              {
                q: "How does end-to-end encryption work?",
                a: "All your messages, calls, and personal data are encrypted before leaving your device, ensuring complete privacy."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSystem;
