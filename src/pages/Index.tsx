import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
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
import SettingsPage from '../components/SettingsPage';
import PolicyModal from '../components/PolicyModal';
import WelcomeScreen from '../components/WelcomeScreen';
import AuthScreen from '../components/AuthScreen';
import MessagesPage from '../components/MessagesPage';
import BotSystem from '../components/BotSystem';
import BotFather from '../components/BotFather';
import MobileUploadPage from '../components/MobileUploadPage';
import { DataManager } from '../utils/dataStorage';
import { PermissionManager } from '../utils/permissions';
import { FileManager } from '../utils/fileManager';
import { CapacitorPermissionManager } from '../utils/capacitorPermissions';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'auth' | 'app'>('welcome');
  const [storageType, setStorageType] = useState<'cloud' | 'local' | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [menuNotifications, setMenuNotifications] = useState(2); // إشعارات القائمة
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' | 'community' | null }>({
    isOpen: false,
    type: null
  });

  useEffect(() => {
    // تهيئة النظام
    const initializeApp = async () => {
      const dataManager = DataManager.getInstance();
      const capacitorManager = CapacitorPermissionManager.getInstance();
      const fileManager = FileManager.getInstance();
      
      // فحص الجلسة الحالية
      if (dataManager.isSessionValid()) {
        setCurrentScreen('app');
      }
      
      // تحميل الملفات المحفوظة
      fileManager.loadFilesFromStorage();
      
      // طلب الصلاحيات (للهاتف أو المتصفح)
      await capacitorManager.requestAllPermissions();
      
      // إرسال إشعار ترحيب إذا كان التطبيق يعمل على الهاتف
      if (capacitorManager.isNative()) {
        await capacitorManager.sendLocalNotification(
          'مرحباً بك في YOU!',
          'تطبيق YOU جاهز للاستخدام على هاتفك'
        );
      }
    };
    
    initializeApp();
  }, []);

  const handleWelcomeAccept = async (selectedStorageType: 'cloud' | 'local') => {
    setStorageType(selectedStorageType);
    setCurrentScreen('auth');
    
    // طلب الصلاحيات عند قبول الشروط
    const permissionManager = PermissionManager.getInstance();
    await permissionManager.requestAllPermissions();
  };

  const handleAuthComplete = () => {
    setCurrentScreen('app');
    
    // إرسال إشعار ترحيب
    const permissionManager = PermissionManager.getInstance();
    permissionManager.sendNotification(
      'مرحباً بك في YOU!',
      'تم إنشاء حسابك بنجاح. ابدأ بمشاركة المحتوى!'
    );
  };

  // Show welcome screen
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onAccept={handleWelcomeAccept} />;
  }

  // Show auth screen
  if (currentScreen === 'auth' && storageType) {
    return <AuthScreen storageType={storageType} onAuthComplete={handleAuthComplete} />;
  }

  const renderActiveComponent = () => {
    // Handle settings
    if (showSettings) {
      return <SettingsPage onBack={() => setShowSettings(false)} />;
    }

    // Handle messages page
    if (showMessages) {
      return <MessagesPage />;
    }

    // Handle special features
    if (activeFeature === 'live') return <LiveStreaming />;
    if (activeFeature === 'randomCall') return <RandomCall />;
    if (activeFeature === 'subscriptions') return <SubscriptionTiers />;
    if (activeFeature === 'support') return <SupportSystem />;
    if (activeFeature === 'bot') return <BotSystem />;
    if (activeFeature === 'botfather') return <BotFather />;
    if (activeFeature === 'profile') return <ProfilePage />;

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
        return <MobileUploadPage />;
      case 'notifications':
        return <NotificationsPage />;
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
      <Header 
        onOpenPanel={() => setRightPanelOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-16">
        {renderActiveComponent()}
      </main>

      {/* Navigation with menu notifications */}
      <Navigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveFeature(null);
          setShowSettings(false);
          setShowMessages(false);
        }}
        onOpenPanel={() => setRightPanelOpen(true)}
        menuNotifications={menuNotifications}
      />

      {/* Right Slide Panel */}
      <RightSlidePanel 
        isOpen={rightPanelOpen} 
        onClose={() => setRightPanelOpen(false)}
        onOpenSettings={() => {
          setShowSettings(true);
          setRightPanelOpen(false);
        }}
        onOpenMessages={() => {
          setShowMessages(true);
          setRightPanelOpen(false);
        }}
        onOpenPolicy={(type) => {
          setPolicyModal({ isOpen: true, type });
          setRightPanelOpen(false);
        }}
        onSetFeature={(feature) => {
          setActiveFeature(feature);
          setShowSettings(false);
          setShowMessages(false);
          setRightPanelOpen(false);
        }}
      />

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ isOpen: false, type: null })}
        type={policyModal.type!}
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
