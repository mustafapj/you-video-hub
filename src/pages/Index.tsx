
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import VideoFeed from '../components/VideoFeed';
import ExplorePage from '../components/ExplorePage';
import UploadPage from '../components/UploadPage';
import NotificationsPage from '../components/NotificationsPage';
import ProfilePage from '../components/ProfilePage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'explore':
        return <ExplorePage />;
      case 'upload':
        return <UploadPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* App Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            MJ
          </h1>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔴</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {renderActiveComponent()}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
