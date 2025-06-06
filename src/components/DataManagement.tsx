
import React, { useState, useEffect } from 'react';
import { Download, Trash2, Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { DataManager, UserData } from '../utils/dataStorage';
import { FileManager } from '../utils/fileManager';

const DataManagement = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dataSize, setDataSize] = useState('0 MB');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const dataManager = DataManager.getInstance();
    const user = dataManager.getUserData();
    setUserData(user);
    
    // حساب حجم البيانات
    calculateDataSize();
  }, []);
  
  const calculateDataSize = () => {
    const dataManager = DataManager.getInstance();
    const fileManager = FileManager.getInstance();
    
    const userData = dataManager.getUserData();
    const userFiles = fileManager.getUserFiles(userData?.id || '');
    
    let totalSize = 0;
    
    // حجم البيانات الشخصية
    if (userData) {
      totalSize += new Blob([JSON.stringify(userData)]).size;
    }
    
    // حجم الملفات
    userFiles.forEach(file => {
      totalSize += file.size;
    });
    
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    setDataSize(`${sizeInMB} MB`);
  };
  
  const downloadMyData = () => {
    const dataManager = DataManager.getInstance();
    const fileManager = FileManager.getInstance();
    
    const userData = dataManager.getUserData();
    const userFiles = fileManager.getUserFiles(userData?.id || '');
    
    const exportData = {
      personalData: userData,
      uploadedFiles: userFiles,
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YOU_data_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const deleteAllData = () => {
    const dataManager = DataManager.getInstance();
    const fileManager = FileManager.getInstance();
    
    if (userData) {
      // حذف الملفات
      const userFiles = fileManager.getUserFiles(userData.id);
      userFiles.forEach(file => {
        fileManager.deleteFile(file.id);
      });
    }
    
    // حذف البيانات الشخصية
    dataManager.clearUserData();
    
    // إعادة توجيه للصفحة الرئيسية
    window.location.reload();
  };

  return (
    <div className="bg-black min-h-screen pt-4 pb-20">
      <div className="px-4">
        <h1 className="text-white text-2xl font-bold mb-6">إدارة البيانات الشخصية</h1>
        
        {/* معلومات البيانات */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-white text-lg font-semibold">معلومات بياناتك</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">إجمالي حجم البيانات:</span>
              <span className="text-white font-medium">{dataSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">تاريخ إنشاء الحساب:</span>
              <span className="text-white font-medium">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('ar') : 'غير محدد'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">آخر تسجيل دخول:</span>
              <span className="text-white font-medium">
                {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString('ar') : 'غير محدد'}
              </span>
            </div>
          </div>
        </div>
        
        {/* إعدادات الخصوصية */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-white text-lg font-semibold">إعدادات الخصوصية</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">رؤية الملف الشخصي</span>
                <p className="text-gray-400 text-sm">من يمكنه رؤية ملفك الشخصي</p>
              </div>
              <select className="bg-gray-800 text-white px-3 py-2 rounded-lg">
                <option value="public">عام</option>
                <option value="friends">الأصدقاء فقط</option>
                <option value="private">خاص</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">إذن المراسلة</span>
                <p className="text-gray-400 text-sm">من يمكنه إرسال رسائل لك</p>
              </div>
              <select className="bg-gray-800 text-white px-3 py-2 rounded-lg">
                <option value="everyone">الجميع</option>
                <option value="friends">الأصدقاء فقط</option>
                <option value="contacts">جهات الاتصال فقط</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* إجراءات البيانات */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-white text-lg font-semibold">إجراءات البيانات</h2>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={downloadMyData}
              className="w-full flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              تحميل نسخة من بياناتي
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              حذف حسابي وجميع بياناتي
            </button>
          </div>
        </div>
        
        {/* تأكيد الحذف */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl max-w-sm mx-4">
              <h3 className="text-white text-lg font-bold mb-4">تأكيد حذف الحساب</h3>
              <p className="text-gray-300 mb-6">
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائياً.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={deleteAllData}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  نعم، احذف
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagement;
