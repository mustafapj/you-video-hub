
// نظام حفظ البيانات المتقدم مشابه لفيسبوك
interface UserData {
  id: string;
  phone: string;
  email?: string;
  password: string;
  name?: string;
  username: string;
  profilePicture?: string;
  isVerified: boolean;
  accountType: 'personal' | 'business';
  storageType: 'cloud' | 'local';
  createdAt: Date;
  lastLogin: Date;
  settings: UserSettings;
  activity: UserActivity[];
}

interface UserSettings {
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    messagePermissions: 'everyone' | 'friends' | 'contacts';
    phoneVisibility: 'public' | 'friends' | 'private';
    emailVisibility: 'public' | 'friends' | 'private';
  };
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    likes: boolean;
    comments: boolean;
    followers: boolean;
  };
  language: string;
  theme: 'dark' | 'light' | 'auto';
  dataUsage: {
    autoPlayVideos: boolean;
    downloadQuality: 'high' | 'medium' | 'low';
    backgroundRefresh: boolean;
  };
}

interface UserActivity {
  type: 'login' | 'video_upload' | 'message_sent' | 'bot_created';
  timestamp: Date;
  details: any;
  ipAddress?: string;
  deviceInfo?: string;
}

// نظام التشفير
const encryptData = (data: any, key: string): string => {
  // تشفير بسيط (في الواقع يجب استخدام مكتبة تشفير قوية)
  return btoa(JSON.stringify(data) + key);
};

const decryptData = (encryptedData: string, key: string): any => {
  try {
    const decoded = atob(encryptedData);
    const data = decoded.replace(key, '');
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// إدارة البيانات
export class DataManager {
  private static instance: DataManager;
  private encryptionKey: string;
  
  constructor() {
    this.encryptionKey = this.generateEncryptionKey();
  }
  
  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }
  
  private generateEncryptionKey(): string {
    return `YOU_${Date.now()}_${Math.random().toString(36)}`;
  }
  
  // حفظ بيانات المستخدم
  saveUserData(userData: UserData): boolean {
    try {
      if (userData.storageType === 'local') {
        const encrypted = encryptData(userData, this.encryptionKey);
        localStorage.setItem('YOU_userData', encrypted);
        localStorage.setItem('YOU_key', this.encryptionKey);
      } else {
        // في المستقبل: حفظ في السحابة (Supabase)
        console.log('Cloud storage not implemented yet');
      }
      
      // حفظ نشاط المستخدم
      this.logActivity({
        type: 'login',
        timestamp: new Date(),
        details: { userId: userData.id }
      });
      
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  }
  
  // استرجاع بيانات المستخدم
  getUserData(): UserData | null {
    try {
      const encrypted = localStorage.getItem('YOU_userData');
      const key = localStorage.getItem('YOU_key');
      
      if (!encrypted || !key) return null;
      
      return decryptData(encrypted, key);
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  }
  
  // تحديث بيانات المستخدم
  updateUserData(updates: Partial<UserData>): boolean {
    try {
      const currentData = this.getUserData();
      if (!currentData) return false;
      
      const updatedData = { ...currentData, ...updates };
      return this.saveUserData(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  }
  
  // تسجيل النشاط
  logActivity(activity: UserActivity): void {
    try {
      const currentData = this.getUserData();
      if (!currentData) return;
      
      currentData.activity = currentData.activity || [];
      currentData.activity.push(activity);
      
      // الاحتفاظ بآخر 100 نشاط فقط
      if (currentData.activity.length > 100) {
        currentData.activity = currentData.activity.slice(-100);
      }
      
      this.saveUserData(currentData);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
  
  // مسح البيانات
  clearUserData(): void {
    localStorage.removeItem('YOU_userData');
    localStorage.removeItem('YOU_key');
  }
  
  // فحص الجلسة
  isSessionValid(): boolean {
    const userData = this.getUserData();
    if (!userData) return false;
    
    const lastLogin = new Date(userData.lastLogin);
    const now = new Date();
    const sessionDuration = 7 * 24 * 60 * 60 * 1000; // أسبوع
    
    return (now.getTime() - lastLogin.getTime()) < sessionDuration;
  }
}

export { UserData, UserSettings, UserActivity };
