
import React from 'react';
import { Camera, Video, Upload, Sparkles } from 'lucide-react';

const UploadPage = () => {
  return (
    <div className="bg-black min-h-screen pt-8 pb-20">
      <div className="px-4">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">Create</h1>
        
        <div className="space-y-6">
          {/* Record Video */}
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-center mb-3">
              <Camera size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Record Video</h3>
            <p className="text-white/80 text-sm">Capture a new video with effects and filters</p>
          </button>

          {/* Upload Video */}
          <button className="w-full bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-center mb-3">
              <Upload size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Upload Video</h3>
            <p className="text-gray-300 text-sm">Select a video from your gallery</p>
          </button>

          {/* Go Live */}
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-center mb-3">
              <Video size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Go Live</h3>
            <p className="text-white/80 text-sm">Start a live broadcast to your followers</p>
          </button>

          {/* AI Effects */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-center mb-3">
              <Sparkles size={32} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">AI Effects</h3>
            <p className="text-white/80 text-sm">Create with AI-powered filters and effects</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
