
import React from 'react';
import { Camera, Image, Video, MapPin, Smartphone } from 'lucide-react';
import { mobileFileManager } from '../utils/mobileFileManager';
import { CapacitorPermissionManager } from '../utils/capacitorPermissions';

const MobileUploadPage = () => {
  const capacitorManager = CapacitorPermissionManager.getInstance();
  
  const handleCameraCapture = async () => {
    const uploadedFile = await mobileFileManager.uploadImageFromCamera();
    if (uploadedFile) {
      // إضافة الموقع للصورة
      await mobileFileManager.addLocationToImage(uploadedFile);
      
      // إرسال إشعار نجاح
      await capacitorManager.sendLocalNotification(
        'تم رفع الصورة!',
        'تم رفع صورتك بنجاح من الكاميرا'
      );
      
      console.log('تم رفع الصورة:', uploadedFile);
    }
  };
  
  const handleGallerySelect = async () => {
    const uploadedFile = await mobileFileManager.uploadImageFromGallery();
    if (uploadedFile) {
      await capacitorManager.sendLocalNotification(
        'تم رفع الصورة!',
        'تم رفع صورتك بنجاح من المعرض'
      );
      
      console.log('تم رفع الصورة:', uploadedFile);
    }
  };
  
  const requestAllPermissions = async () => {
    await capacitorManager.requestAllPermissions();
    await capacitorManager.sendLocalNotification(
      'تم منح الصلاحيات!',
      'يمكنك الآن استخدام جميع مميزات التطبيق'
    );
  };
  
  return (
    <div className="bg-black min-h-screen pt-8 pb-20">
      <div className="px-4">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">إنشاء محتوى</h1>
        
        <div className="space-y-6">
          {/* التقاط صورة من الكاميرا */}
          <button 
            onClick={handleCameraCapture}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-center mb-3">
              <Camera size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">التقاط صورة</h3>
            <p className="text-white/80 text-sm">التقط صورة جديدة من الكاميرا</p>
          </button>

          {/* اختيار من المعرض */}
          <button 
            onClick={handleGallerySelect}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-center mb-3">
              <Image size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">من المعرض</h3>
            <p className="text-white/80 text-sm">اختر صورة من معرض الصور</p>
          </button>

          {/* تسجيل فيديو */}
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-center mb-3">
              <Video size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">تسجيل فيديو</h3>
            <p className="text-white/80 text-sm">سجل فيديو جديد بالكاميرا</p>
          </button>

          {/* إضافة الموقع */}
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-center mb-3">
              <MapPin size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">إضافة الموقع</h3>
            <p className="text-white/80 text-sm">شارك موقعك مع المنشور</p>
          </button>

          {/* طلب الصلاحيات */}
          <button 
            onClick={requestAllPermissions}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-center mb-3">
              <Smartphone size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">تفعيل المميزات</h3>
            <p className="text-white/80 text-sm">منح الصلاحيات للوصول لمميزات الهاتف</p>
          </button>
        </div>
        
        {/* معلومات التطبيق */}
        <div className="mt-8 bg-gray-900/50 rounded-lg p-4">
          <p className="text-gray-300 text-sm text-center">
            {capacitorManager.isNative() 
              ? '🚀 تعمل على تطبيق الهاتف الأصلي' 
              : '🌐 تعمل في متصفح الويب'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileUploadPage;
