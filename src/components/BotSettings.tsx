
import React, { useState } from 'react';
import { Settings, Shield, Clock, MessageCircle, Users, Save } from 'lucide-react';

const BotSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    botEnabled: true,
    language: 'ar',
    timezone: 'Asia/Riyadh',
    
    // Security Settings
    antiSpam: true,
    antiFlood: true,
    linkProtection: true,
    capsFilter: true,
    
    // Auto Moderation
    autoDelete: {
      enabled: true,
      deleteLinks: true,
      deleteMedia: false,
      deleteForwards: false
    },
    
    // Command Settings
    commandPrefix: '/',
    allowPrivateCommands: false,
    logCommands: true,
    
    // Group Settings
    maxWarnings: 3,
    muteDuration: 60, // minutes
    autoUnmuteEnabled: true,
    
    // Logging
    logChannel: '',
    logActions: true,
    logJoins: true,
    logLeaves: true
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-400" />
          <h2 className="text-white text-xl font-bold">إعدادات البوت</h2>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>حفظ الإعدادات</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            الإعدادات العامة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">تفعيل البوت</span>
              <input
                type="checkbox"
                checked={settings.botEnabled}
                onChange={(e) => setSettings({...settings, botEnabled: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">اللغة</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">المنطقة الزمنية</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Asia/Riyadh">الرياض</option>
                <option value="Asia/Dubai">دبي</option>
                <option value="Asia/Kuwait">الكويت</option>
                <option value="Africa/Cairo">القاهرة</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">رمز الأوامر</label>
              <input
                type="text"
                value={settings.commandPrefix}
                onChange={(e) => setSettings({...settings, commandPrefix: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                maxLength={1}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            إعدادات الحماية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">مكافحة الرسائل المزعجة</span>
              <input
                type="checkbox"
                checked={settings.antiSpam}
                onChange={(e) => setSettings({...settings, antiSpam: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">مكافحة الإرسال المتكرر</span>
              <input
                type="checkbox"
                checked={settings.antiFlood}
                onChange={(e) => setSettings({...settings, antiFlood: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">حماية من الروابط</span>
              <input
                type="checkbox"
                checked={settings.linkProtection}
                onChange={(e) => setSettings({...settings, linkProtection: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">فلتر الحروف الكبيرة</span>
              <input
                type="checkbox"
                checked={settings.capsFilter}
                onChange={(e) => setSettings({...settings, capsFilter: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Auto Moderation */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            الإشراف التلقائي
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">تفعيل الحذف التلقائي</span>
              <input
                type="checkbox"
                checked={settings.autoDelete.enabled}
                onChange={(e) => setSettings({
                  ...settings, 
                  autoDelete: {...settings.autoDelete, enabled: e.target.checked}
                })}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
            </div>
            
            {settings.autoDelete.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">حذف الروابط</span>
                  <input
                    type="checkbox"
                    checked={settings.autoDelete.deleteLinks}
                    onChange={(e) => setSettings({
                      ...settings, 
                      autoDelete: {...settings.autoDelete, deleteLinks: e.target.checked}
                    })}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">حذف الوسائط</span>
                  <input
                    type="checkbox"
                    checked={settings.autoDelete.deleteMedia}
                    onChange={(e) => setSettings({
                      ...settings, 
                      autoDelete: {...settings.autoDelete, deleteMedia: e.target.checked}
                    })}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">حذف المعاد توجيهها</span>
                  <input
                    type="checkbox"
                    checked={settings.autoDelete.deleteForwards}
                    onChange={(e) => setSettings({
                      ...settings, 
                      autoDelete: {...settings.autoDelete, deleteForwards: e.target.checked}
                    })}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">الحد الأقصى للتحذيرات</label>
                <input
                  type="number"
                  value={settings.maxWarnings}
                  onChange={(e) => setSettings({...settings, maxWarnings: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min={1}
                  max={10}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">مدة الكتم (دقائق)</label>
                <input
                  type="number"
                  value={settings.muteDuration}
                  onChange={(e) => setSettings({...settings, muteDuration: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min={1}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logging Settings */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            إعدادات السجلات
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">قناة السجلات</label>
              <input
                type="text"
                value={settings.logChannel}
                onChange={(e) => setSettings({...settings, logChannel: e.target.value})}
                placeholder="@log_channel أو معرف القناة"
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">تسجيل الإجراءات</span>
                <input
                  type="checkbox"
                  checked={settings.logActions}
                  onChange={(e) => setSettings({...settings, logActions: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">تسجيل الانضمام</span>
                <input
                  type="checkbox"
                  checked={settings.logJoins}
                  onChange={(e) => setSettings({...settings, logJoins: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">تسجيل المغادرة</span>
                <input
                  type="checkbox"
                  checked={settings.logLeaves}
                  onChange={(e) => setSettings({...settings, logLeaves: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
          <h3 className="text-white font-semibold mb-3">ملخص حالة البوت</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${settings.botEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-sm">البوت</span>
            </div>
            <div>
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${settings.antiSpam ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-sm">الحماية</span>
            </div>
            <div>
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${settings.autoDelete.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-sm">الحذف التلقائي</span>
            </div>
            <div>
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${settings.logActions ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-sm">السجلات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
