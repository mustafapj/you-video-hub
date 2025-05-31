
import React, { useState } from 'react';
import { Bot, Shield, Users, MessageSquare, Settings, AlertTriangle } from 'lucide-react';
import BotCommands from './BotCommands';
import MemberManagement from './MemberManagement';
import WelcomeMessages from './WelcomeMessages';
import WarningSystem from './WarningSystem';
import BotSettings from './BotSettings';

const BotSystem = () => {
  const [activeSection, setActiveSection] = useState('commands');

  const sections = [
    { id: 'commands', icon: Bot, label: 'الأوامر', component: BotCommands },
    { id: 'members', icon: Users, label: 'إدارة الأعضاء', component: MemberManagement },
    { id: 'messages', icon: MessageSquare, label: 'الرسائل التلقائية', component: WelcomeMessages },
    { id: 'warnings', icon: AlertTriangle, label: 'نظام التحذيرات', component: WarningSystem },
    { id: 'settings', icon: Settings, label: 'إعدادات البوت', component: BotSettings },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || BotCommands;

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">بوت YOU</h1>
              <p className="text-white/80">نظام إدارة المجموعات المتكامل</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">أقسام البوت</h3>
              <div className="space-y-2">
                {sections.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeSection === id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSystem;
