import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DoctorImageUpload from './updateModel/imageUploded';
import DoctorEditFormFields from './updateModel/Form';
import { validateDoctorForm } from '../../../utils/Admin/Validations';

const DoctorEditModal = ({ isOpen, onClose, doctor, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    dr_id: '',
    full_name: '',
    email: '',
    phone: '',
    specialization: '',
    address: '',
    profile_picture: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize form with doctor data
  useEffect(() => {
    if (doctor) {
      setFormData({
        dr_id: doctor.dr_id || '',
        full_name: doctor.full_name || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        specialization: doctor.specialization || '',
        address: doctor.address || '',
        profile_picture: null,
      });
      
      // Set existing image preview
      if (doctor.profile_picture_url) {
        setImagePreview(doctor.profile_picture_url);
      }
    }
  }, [doctor]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle image change
  const handleImageChange = (file, error) => {
    if (error) {
      setErrors(prev => ({ ...prev, profile_picture: error }));
      return;
    }

    setFormData(prev => ({ ...prev, profile_picture: file }));

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    // Clear error
    if (errors.profile_picture) {
      setErrors(prev => ({ ...prev, profile_picture: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateDoctorForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await onSubmit(formData);
    
    if (result.success) {
      handleClose();
    } else if (result.errors) {
      setErrors(result.errors);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      dr_id: '',
      full_name: '',
      email: '',
      phone: '',
      specialization: '',
      address: '',
      profile_picture: null,
    });
    setImagePreview(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B69D4] to-[#2d54b8] text-white p-4 sm:p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Edit Doctor Details</h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">
              Update doctor information
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            disabled={loading}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form Container - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Left Column - Profile Image */}
              <div className="lg:col-span-4">
                <DoctorImageUpload
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                  error={errors.profile_picture}
                  disabled={loading}
                />
              </div>

              {/* Right Column - Form Fields */}
              <div className="lg:col-span-8">
                <DoctorEditFormFields
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Sticky Footer */}
          <div className="flex-shrink-0 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#3B69D4] text-white rounded-lg font-semibold hover:bg-[#2d54b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Updating...</span>
                  <span className="sm:hidden">Updating...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Update Doctor</span>
                  <span className="sm:hidden">Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorEditModal;