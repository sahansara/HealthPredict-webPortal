import React, { useState } from 'react';
import { Upload, User, Camera } from 'lucide-react';
import { validateImageFile } from '../../../../utils/Admin/Validations';

const DoctorImageUpload = ({ imagePreview, onImageChange, error, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file) {
      const validationError = validateImageFile(file);
      if (validationError) {
        onImageChange(null, validationError);
        return;
      }
      onImageChange(file, null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700">
        Profile Picture
      </label>
      
      {/* Image Preview */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl shadow-lg border-2 sm:border-4 border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 sm:border-4 border-gray-200">
              <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
            </div>
          )}
          
          {/* Camera Icon Overlay */}
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[#3B69D4] p-1.5 sm:p-2 rounded-full shadow-lg">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 text-center transition-all ${
          isDragging
            ? 'border-[#3B69D4] bg-blue-50'
            : 'border-gray-300 hover:border-[#3B69D4]'
        }`}
      >
        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mx-auto mb-2 sm:mb-3" />
        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
          Drag & drop image here
        </p>
        <p className="text-xs text-gray-500 mb-2 sm:mb-3">or</p>
        <label className="cursor-pointer">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#3B69D4] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#2d54b8] transition-colors inline-block">
            Browse Files
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
            disabled={disabled}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2 sm:mt-3">
          PNG, JPG, GIF up to 5MB
        </p>
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default DoctorImageUpload;