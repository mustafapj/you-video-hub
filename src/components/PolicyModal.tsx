
import React from 'react';
import { X, AlertTriangle, Shield, Users, Camera } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'community';
}

const PolicyModal = ({ isOpen, onClose, type }: PolicyModalProps) => {
  if (!isOpen) return null;

  const getPolicyContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms and Conditions',
          icon: Shield,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Age Requirement</h3>
              <p className="text-gray-300">You must be at least 18 years old to use MJ. ID verification may be required.</p>
              
              <h3 className="text-lg font-semibold text-white mb-3">Account Suspension Policy</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Random Call Violations:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>First violation: 1 week ban from random calls</li>
                  <li>Second violation: 2 weeks ban from random calls</li>
                  <li>Third violation: 6 months ban from random calls</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">Prohibited Content</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-300">
                <li>Violence, terrorism, or harmful content</li>
                <li>Nudity or sexual content</li>
                <li>Foul language or harassment</li>
                <li>Promotion of illegal substances</li>
                <li>Self-harm or suicide content</li>
              </ul>
            </div>
          )
        };
      
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Shield,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Data Collection</h3>
              <p className="text-gray-300">We collect information similar to Facebook, Instagram, and TikTok policies including:</p>
              <ul className="list-disc ml-5 space-y-1 text-gray-300">
                <li>Profile information and content you create</li>
                <li>Usage data and interactions</li>
                <li>Device information and location data</li>
                <li>Communications and contacts (with permission)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-3">End-to-End Encryption</h3>
              <p className="text-gray-300">All direct messages and calls are protected with end-to-end encryption.</p>
              
              <h3 className="text-lg font-semibold text-white mb-3">Data Sharing</h3>
              <p className="text-gray-300">We follow industry-standard practices for data sharing and processing, similar to major social platforms.</p>
            </div>
          )
        };
      
      case 'community':
        return {
          title: 'Community Guidelines',
          icon: Users,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Random Call Safety</h3>
              <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-yellow-500 font-semibold">Important Safety Rules</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-300">
                  <li>No alcohol or cigarette consumption on camera</li>
                  <li>No foul language or harassment</li>
                  <li>Keep all body parts appropriately covered</li>
                  <li>No sharing of personal information</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">Content Guidelines</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-300">
                <li>Short videos maximum: 60 seconds</li>
                <li>No violent or harmful content</li>
                <li>No nudity or sexual content</li>
                <li>No promotion of illegal activities</li>
                <li>No content encouraging self-harm</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-3">Chat and Groups</h3>
              <p className="text-gray-300">We follow Telegram's community policies for messaging and group interactions.</p>
            </div>
          )
        };
      
      default:
        return { title: '', icon: Shield, content: null };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-bold text-white">{policy.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {policy.content}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
