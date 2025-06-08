// نظام إدارة الملفات
interface FileUploadOptions {
  maxSize: number; // بالبايت
  allowedTypes: string[];
  quality?: number; // للصور والفيديو (0-1)
  thumbnail?: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail?: string;
  uploadedAt: Date;
  userId: string;
}

export class FileManager {
  private static instance: FileManager;
  private uploadedFiles: UploadedFile[] = [];
  
  static getInstance(): FileManager {
    if (!FileManager.instance) {
      FileManager.instance = new FileManager();
    }
    return FileManager.instance;
  }
  
  // رفع صورة
  async uploadImage(file: File, options?: Partial<FileUploadOptions>): Promise<UploadedFile | null> {
    const defaultOptions: FileUploadOptions = {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      quality: 0.8,
      thumbnail: true
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    if (!this.validateFile(file, finalOptions)) {
      return null;
    }
    
    try {
      const compressedFile = await this.compressImage(file, finalOptions.quality!);
      const url = await this.createObjectURL(compressedFile);
      const thumbnail = finalOptions.thumbnail ? await this.createThumbnail(compressedFile) : undefined;
      
      const uploadedFile: UploadedFile = {
        id: this.generateFileId(),
        name: file.name,
        type: file.type,
        size: compressedFile.size,
        url,
        thumbnail,
        uploadedAt: new Date(),
        userId: this.getCurrentUserId()
      };
      
      this.uploadedFiles.push(uploadedFile);
      this.saveFilesToStorage();
      
      return uploadedFile;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
  
  // رفع فيديو
  async uploadVideo(file: File, options?: Partial<FileUploadOptions>): Promise<UploadedFile | null> {
    const defaultOptions: FileUploadOptions = {
      maxSize: 100 * 1024 * 1024, // 100MB
      allowedTypes: ['video/mp4', 'video/webm', 'video/mov'],
      thumbnail: true
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    if (!this.validateFile(file, finalOptions)) {
      return null;
    }
    
    try {
      const url = await this.createObjectURL(file);
      const thumbnail = finalOptions.thumbnail ? await this.createVideoThumbnail(file) : undefined;
      
      const uploadedFile: UploadedFile = {
        id: this.generateFileId(),
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        thumbnail,
        uploadedAt: new Date(),
        userId: this.getCurrentUserId()
      };
      
      this.uploadedFiles.push(uploadedFile);
      this.saveFilesToStorage();
      
      return uploadedFile;
    } catch (error) {
      console.error('Error uploading video:', error);
      return null;
    }
  }
  
  // التحقق من صحة الملف
  private validateFile(file: File, options: FileUploadOptions): boolean {
    if (file.size > options.maxSize) {
      alert(`حجم الملف كبير جداً. الحد الأقصى ${options.maxSize / (1024 * 1024)}MB`);
      return false;
    }
    
    if (!options.allowedTypes.includes(file.type)) {
      alert('نوع الملف غير مدعوم');
      return false;
    }
    
    return true;
  }
  
  // ضغط الصورة
  private async compressImage(file: File, quality: number): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 1920;
        const maxHeight = 1080;
        
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
  
  // إنشاء صورة مصغرة
  private async createThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 150;
        canvas.height = 150;
        
        const aspectRatio = img.width / img.height;
        let drawWidth = 150;
        let drawHeight = 150;
        let offsetX = 0;
        let offsetY = 0;
        
        if (aspectRatio > 1) {
          drawWidth = 150 * aspectRatio;
          offsetX = -(drawWidth - 150) / 2;
        } else {
          drawHeight = 150 / aspectRatio;
          offsetY = -(drawHeight - 150) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
  
  // إنشاء صورة مصغرة للفيديو
  private async createVideoThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      video.onloadeddata = () => {
        video.currentTime = 1; // الثانية الأولى
      };
      
      video.onseeked = () => {
        canvas.width = 150;
        canvas.height = 150;
        
        const aspectRatio = video.videoWidth / video.videoHeight;
        let drawWidth = 150;
        let drawHeight = 150;
        let offsetX = 0;
        let offsetY = 0;
        
        if (aspectRatio > 1) {
          drawWidth = 150 * aspectRatio;
          offsetX = -(drawWidth - 150) / 2;
        } else {
          drawHeight = 150 / aspectRatio;
          offsetY = -(drawHeight - 150) / 2;
        }
        
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      
      video.src = URL.createObjectURL(file);
      video.load();
    });
  }
  
  // إنشاء URL للملف
  private async createObjectURL(file: File): Promise<string> {
    // في الواقع يجب رفع الملف لخادم أو تخزين سحابي
    return URL.createObjectURL(file);
  }
  
  // إنشاء معرف فريد للملف
  private generateFileId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // الحصول على معرف المستخدم الحالي
  private getCurrentUserId(): string {
    // يجب الحصول على معرف المستخدم من نظام إدارة البيانات
    return 'current_user_id';
  }
  
  // حفظ قائمة الملفات
  private saveFilesToStorage(): void {
    localStorage.setItem('YOU_uploadedFiles', JSON.stringify(this.uploadedFiles));
  }
  
  // استرجاع قائمة الملفات
  loadFilesFromStorage(): void {
    const stored = localStorage.getItem('YOU_uploadedFiles');
    if (stored) {
      this.uploadedFiles = JSON.parse(stored);
    }
  }
  
  // الحصول على ملفات المستخدم
  getUserFiles(userId: string): UploadedFile[] {
    return this.uploadedFiles.filter(file => file.userId === userId);
  }
  
  // حذف ملف
  deleteFile(fileId: string): boolean {
    const index = this.uploadedFiles.findIndex(file => file.id === fileId);
    if (index !== -1) {
      const file = this.uploadedFiles[index];
      URL.revokeObjectURL(file.url);
      this.uploadedFiles.splice(index, 1);
      this.saveFilesToStorage();
      return true;
    }
    return false;
  }
}

export type { UploadedFile, FileUploadOptions };
