
import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';

interface YmoePageProps {
  onBack: () => void;
}

const YmoePage = ({ onBack }: YmoePageProps) => {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-white/20">
          <button onClick={onBack} className="mr-4 p-2 rounded-full bg-red-500">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold flex-1 text-center">صفحة YMOE</h1>
          <button className="p-2 rounded-full bg-orange-500">
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">مرحباً بك في YMOE</h2>
            <p className="text-lg mb-8">هذه صفحة YMOE التي تحتوي على محتوى خاص</p>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-semibold mb-4">المحتوى المتاح</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">فيديوهات حصرية</h4>
                  <p className="text-sm text-gray-300">محتوى فيديو خاص بالأعضاء</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">بث مباشر</h4>
                  <p className="text-sm text-gray-300">جلسات بث مباشر تفاعلية</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">مجتمع خاص</h4>
                  <p className="text-sm text-gray-300">تفاعل مع الأعضاء المميزين</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YmoePage;
