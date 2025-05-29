
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import VideoFeed from '../components/VideoFeed';
import ExplorePage from '../components/ExplorePage';
import UploadPage from '../components/UploadPage';
import NotificationsPage from '../components/NotificationsPage';
import ProfilePage from '../components/ProfilePage';
import RightSlidePanel from '../components/RightSlidePanel';
import Stories from '../components/Stories';
import LiveStreaming from '../components/LiveStreaming';
import RandomCall from '../components/RandomCall';
import SubscriptionTiers from '../components/SubscriptionTiers';
import SupportSystem from '../components/SupportSystem';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const renderActiveComponent = () => {
    // Handle special features
    if (activeFeature === 'live') return <LiveStreaming />;
    if (activeFeature === 'randomCall') return <RandomCall />;
    if (activeFeature === 'subscriptions') return <SubscriptionTiers />;
    if (activeFeature === 'support') return <SupportSystem />;

    // Handle main tabs
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <Stories />
            <VideoFeed />
          </div>
        );
      case 'explore':
        return <ExplorePage />;
      case 'upload':
        return <UploadPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <div>
            <Stories />
            <VideoFeed />
          </div>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen relative">
      {/* App Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            MJ
          </h1>
          <div className="flex items-center space-x-4">
            {/* Feature Buttons */}
            <button
              onClick={() => setActiveFeature('live')}
              className="bg-red-500 px-3 py-1 rounded-full text-white text-sm font-bold"
            >
              LIVE
            </button>
            <button
              onClick={() => setActiveFeature('randomCall')}
              className="bg-green-500 px-3 py-1 rounded-full text-white text-sm font-bold"
            >
              CALL
            </button>
            <button
              onClick={() => setActiveFeature('subscriptions')}
              className="bg-purple-500 px-3 py-1 rounded-full text-white text-sm font-bold"
            >
              PRO
            </button>
            <button
              onClick={() => setRightPanelOpen(true)}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {renderActiveComponent()}
      </main>

      {/* Navigation */}
      <Navigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveFeature(null);
        }} 
      />

      {/* Right Slide Panel */}
      <RightSlidePanel 
        isOpen={rightPanelOpen} 
        onClose={() => setRightPanelOpen(false)} 
      />

      {/* Overlay for right panel */}
      {rightPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setRightPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
