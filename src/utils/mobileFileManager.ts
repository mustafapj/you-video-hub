
import { CapacitorPermissionManager } from './capacitorPermissions';
import { FileManager } from './fileManager';

export class MobileFileManager extends FileManager {
  private capacitorManager: CapacitorPermissionManager;
  
  constructor() {
    super();
    this.capacitorManager = CapacitorPermissionManager.getInstance();
  }
  
  // التقاط صورة من الكاميرا
  async captureImageFromCamera(): Promise<string | null> {
    const hasPermission = await this.capacitorManager.requestCameraPermission();
    if (!hasPermission) {
      alert('نحتاج إذن الوصول للكاميرا');
      return null;
    }
    
    return await this.capacitorManager.capturePhoto();
  }
  
  // اختيار صورة من المعرض
  async selectImageFromGallery(): Promise<string | null> {
    const hasPermission = await this.capacitorManager.requestCameraPermission();
    if (!hasPermission) {
      alert('نحتاج إذن الوصول للمعرض');
      return null;
    }
    
    return await this.capacitorManager.selectPhoto();
  }
  
  // رفع صورة من الكاميرا مباشرة
  async uploadImageFromCamera(): Promise<any | null> {
    const imageData = await this.captureImageFromCamera();
    if (!imageData) return null;
    
    // تحويل dataUrl إلى File
    const response = await fetch(imageData);
    const blob = await response.blob();
    const file = new File([blob], `camera_${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    return await this.uploadImage(file);
  }
  
  // رفع صورة من المعرض
  async uploadImageFromGallery(): Promise<any | null> {
    const imageData = await this.selectImageFromGallery();
    if (!imageData) return null;
    
    // تحويل dataUrl إلى File
    const response = await fetch(imageData);
    const blob = await response.blob();
    const file = new File([blob], `gallery_${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    return await this.uploadImage(file);
  }
  
  // إضافة الموقع للصورة
  async addLocationToImage(imageFile: any): Promise<any> {
    const location = await this.capacitorManager.getCurrentLocation();
    if (location && imageFile) {
      imageFile.location = location;
    }
    return imageFile;
  }
}

export const mobileFileManager = new MobileFileManager();
