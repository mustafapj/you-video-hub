
import React, { useState } from 'react';
import { AlertTriangle, Clock, User, X, Plus } from 'lucide-react';

interface Warning {
  id: string;
  userId: string;
  username: string;
  reason: string;
  moderator: string;
  date: string;
  expires?: string;
}

const WarningSystem = () => {
  const [warnings, setWarnings] = useState<Warning[]>([
    {
      id: '1',
      userId: 'user1',
      username: '@mohammed_tech',
      reason: 'استخدام ألفاظ غير لائقة',
      moderator: '@admin_you',
      date: '2024-01-25 14:30',
      expires: '2024-02-25 14:30'
    },
    {
      id: '2',
      userId: 'user2',
      username: '@sara_spam',
      reason: 'إرسال رسائل مزعجة',
      moderator: '@mod_you',
      date: '2024-01-24 10:15'
    }
  ]);

  const [autoActions, setAutoActions] = useState({
    enabled: true,
    muteAt: 3,
    kickAt: 5,
    banAt: 7,
    warningExpiry: 30 // days
  });

  const [showAddWarning, setShowAddWarning] = useState(false);
  const [newWarning, setNewWarning] = useState({
    username: '',
    reason: '',
    hasExpiry: false,
    expiryDays: 30
  });

  const handleAddWarning = () => {
    if (newWarning.username && newWarning.reason) {
      const warning: Warning = {
        id: Date.now().toString(),
        userId: 'user' + Date.now(),
        username: newWarning.username,
        reason: newWarning.reason,
        moderator: '@current_user',
        date: new Date().toLocaleString('ar'),
        expires: newWarning.hasExpiry 
          ? new Date(Date.now() + newWarning.expiryDays * 24 * 60 * 60 * 1000).toLocaleString('ar')
          : undefined
      };

      setWarnings([...warnings, warning]);
      setNewWarning({ username: '', reason: '', hasExpiry: false, expiryDays: 30 });
      setShowAddWarning(false);
    }
  };

  const removeWarning = (id: string) => {
    setWarnings(warnings.filter(w => w.id !== id));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h2 className="text-white text-xl font-bold">نظام التحذيرات</h2>
        </div>
        <button
          onClick={() => setShowAddWarning(true)}
          className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة تحذير</span>
        </button>
      </div>

      {/* Auto Actions Settings */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-white font-semibold mb-4">الإجراءات التلقائية</h3>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={autoActions.enabled}
            onChange={(e) => setAutoActions({...autoActions, enabled: e.target.checked})}
            className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
          />
          <label className="ml-2 text-gray-300">تفعيل الإجراءات التلقائية</label>
        </div>

        {autoActions.enabled && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">كتم عند</label>
              <input
                type="number"
                value={autoActions.muteAt}
                onChange={(e) => setAutoActions({...autoActions, muteAt: parseInt(e.target.value)})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-400 text-xs">تحذيرات</span>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">طرد عند</label>
              <input
                type="number"
                value={autoActions.kickAt}
                onChange={(e) => setAutoActions({...autoActions, kickAt: parseInt(e.target.value)})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-400 text-xs">تحذيرات</span>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">حظر عند</label>
              <input
                type="number"
                value={autoActions.banAt}
                onChange={(e) => setAutoActions({...autoActions, banAt: parseInt(e.target.value)})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-400 text-xs">تحذيرات</span>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">انتهاء التحذير</label>
              <input
                type="number"
                value={autoActions.warningExpiry}
                onChange={(e) => setAutoActions({...autoActions, warningExpiry: parseInt(e.target.value)})}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-400 text-xs">يوم</span>
            </div>
          </div>
        )}
      </div>

      {/* Warnings List */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold">التحذيرات النشطة ({warnings.length})</h3>
        
        {warnings.map((warning) => (
          <div key={warning.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{warning.username}</span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-xs">تحذير</span>
                </div>
                
                <p className="text-gray-300 mb-2">{warning.reason}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>بواسطة: {warning.moderator}</span>
                  <span>التاريخ: {warning.date}</span>
                  {warning.expires && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>ينتهي: {warning.expires}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => removeWarning(warning.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="إزالة التحذير"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {warnings.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">لا توجد تحذيرات نشطة</p>
          </div>
        )}
      </div>

      {/* Add Warning Modal */}
      {showAddWarning && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4">إضافة تحذير جديد</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  value={newWarning.username}
                  onChange={(e) => setNewWarning({...newWarning, username: e.target.value})}
                  placeholder="@username"
                  className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">سبب التحذير</label>
                <textarea
                  value={newWarning.reason}
                  onChange={(e) => setNewWarning({...newWarning, reason: e.target.value})}
                  placeholder="اكتب سبب التحذير..."
                  className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newWarning.hasExpiry}
                  onChange={(e) => setNewWarning({...newWarning, hasExpiry: e.target.checked})}
                  className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                />
                <label className="ml-2 text-gray-300">تحديد تاريخ انتهاء</label>
              </div>
              
              {newWarning.hasExpiry && (
                <div>
                  <label className="block text-gray-300 text-sm mb-2">عدد الأيام</label>
                  <input
                    type="number"
                    value={newWarning.expiryDays}
                    onChange={(e) => setNewWarning({...newWarning, expiryDays: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddWarning(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddWarning}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition-colors"
              >
                إضافة التحذير
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarningSystem;
