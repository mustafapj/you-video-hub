
// نظام طلب صلاحيات الوصول لموارد الجهاز
interface PermissionStatus {
  camera: boolean;
  microphone: boolean;
  location: boolean;
  notifications: boolean;
  storage: boolean;
}

export class PermissionManager {
  private static instance: PermissionManager;
  private permissions: PermissionStatus = {
    camera: false,
    microphone: false,
    location: false,
    notifications: false,
    storage: true // متاح دائماً في المتصفح
  };
  
  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }
  
  // طلب صلاحية الكاميرا
  async requestCameraPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      this.permissions.camera = true;
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      this.permissions.camera = false;
      return false;
    }
  }
  
  // طلب صلاحية المايكروفون
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      this.permissions.microphone = true;
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      this.permissions.microphone = false;
      return false;
    }
  }
  
  // طلب صلاحية الموقع
  async requestLocationPermission(): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.permissions.location = true;
            resolve(true);
          },
          () => {
            this.permissions.location = false;
            resolve(false);
          }
        );
      });
    } catch (error) {
      console.error('Location permission denied:', error);
      this.permissions.location = false;
      return false;
    }
  }
  
  // طلب صلاحية الإشعارات
  async requestNotificationPermission(): Promise<boolean> {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        this.permissions.notifications = permission === 'granted';
        return this.permissions.notifications;
      }
      return false;
    } catch (error) {
      console.error('Notification permission denied:', error);
      this.permissions.notifications = false;
      return false;
    }
  }
  
  // طلب جميع الصلاحيات المطلوبة
  async requestAllPermissions(): Promise<PermissionStatus> {
    await Promise.all([
      this.requestCameraPermission(),
      this.requestMicrophonePermission(),
      this.requestLocationPermission(),
      this.requestNotificationPermission()
    ]);
    
    return this.permissions;
  }
  
  // فحص حالة الصلاحيات
  getPermissionStatus(): PermissionStatus {
    return { ...this.permissions };
  }
  
  // إرسال إشعار
  sendNotification(title: string, body: string, icon?: string): void {
    if (this.permissions.notifications && 'Notification' in window) {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  }
}
