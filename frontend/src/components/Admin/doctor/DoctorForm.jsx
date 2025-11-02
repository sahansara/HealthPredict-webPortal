import React, { useState } from 'react';
import { SPECIALIZATIONS, DOCTOR_ROLE_ID } from '../../../utils/Admin/doctorConstants';
import { validateDoctorForm } from '../../../utils/Admin/Validations';

const DoctorForm = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    dr_id: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    password: '',
    profile_picture: null,
    role_id: DOCTOR_ROLE_ID,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_picture: file,
      }));
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    const validationErrors = validateDoctorForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const result = await onSubmit(formData);

    if (!result.success && result.errors) {
      setErrors(result.errors);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Register New Doctor</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doctor ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor ID *
            </label>
            <input
              type="text"
              name="dr_id"
              value={formData.dr_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
                errors.dr_id ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="D12345"
            />
            {errors.dr_id && (
              <p className="text-red-500 text-sm mt-1">{errors.dr_id}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
                errors.full_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Dr. John Doe"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="doctor@medicore.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0771234567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization *
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
                errors.specialization ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Specialization</option>
              {SPECIALIZATIONS.filter(s => s.value).map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4]"
            placeholder="Enter full address"
          />
        </div>

        {/* Temporary Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temporary Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter temporary password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Doctor will be required to change this on first login
          </p>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4]"
          />
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-[#3B69D4] text-white rounded-lg font-semibold transition-all ${
              loading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-[#2d54b8] hover:shadow-lg'
            }`}
          >
            {loading ? 'Registering...' : 'Register Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;