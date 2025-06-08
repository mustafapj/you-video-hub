
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export class CapacitorPermissionManager {
  private static instance: CapacitorPermissionManager;
  
  static getInstance(): CapacitorPermissionManager {
    if (!CapacitorPermissionManager.instance) {
      CapacitorPermissionManager.instance = new CapacitorPermissionManager();
    }
    return CapacitorPermissionManager.instance;
  }
  
  // فحص إذا كان التطبيق يعمل على هاتف
  isNative(): boolean {
    return Capacitor.isNativePlatform();
  }
  
  // طلب صلاحية الكاميرا
  async requestCameraPermission(): Promise<boolean> {
    if (!this.isNative()) {
      // للويب، استخدم navigator.mediaDevices
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch {
        return false;
      }
    }
    
    try {
      const permissions = await Camera.requestPermissions();
      return permissions.camera === 'granted';
    } catch {
      return false;
    }
  }
  
  // التقاط صورة
  async capturePhoto(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      
      return image.dataUrl || null;
    } catch (error) {
      console.error('Error capturing photo:', error);
      return null;
    }
  }
  
  // اختيار صورة من المعرض
  async selectPhoto(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      
      return image.dataUrl || null;
    } catch (error) {
      console.error('Error selecting photo:', error);
      return null;
    }
  }
  
  // طلب صلاحية الموقع
  async requestLocationPermission(): Promise<boolean> {
    if (!this.isNative()) {
      try {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false)
          );
        });
      } catch {
        return false;
      }
    }
    
    try {
      const permissions = await Geolocation.requestPermissions();
      return permissions.location === 'granted';
    } catch {
      return false;
    }
  }
  
  // الحصول على الموقع الحالي
  async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }
  
  // طلب صلاحية الإشعارات
  async requestNotificationPermission(): Promise<boolean> {
    if (!this.isNative()) {
      try {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          return permission === 'granted';
        }
        return false;
      } catch {
        return false;
      }
    }
    
    try {
      const permissions = await LocalNotifications.requestPermissions();
      return permissions.display === 'granted';
    } catch {
      return false;
    }
  }
  
  // إرسال إشعار محلي
  async sendLocalNotification(title: string, body: string): Promise<void> {
    if (!this.isNative()) {
      // للويب
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body });
      }
      return;
    }
    
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            schedule: { at: new Date(Date.now() + 1000) }
          }
        ]
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
  
  // طلب جميع الصلاحيات
  async requestAllPermissions(): Promise<void> {
    await Promise.all([
      this.requestCameraPermission(),
      this.requestLocationPermission(),
      this.requestNotificationPermission()
    ]);
  }
}
