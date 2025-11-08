import React, { useState } from 'react';

const RegistrationForm = ({ type, fields, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach(field => {
      initial[field.name] = field.defaultValue || '';
    });
    return initial;
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (field, value) => {
    if (field.required && !value.toString().trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const result = field.validation(value);
      if (result !== true) return result;
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach(field => {
      if (field.type !== 'file') {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const renderField = (field) => {
    const baseClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
      errors[field.name] ? 'border-red-500' : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
      case 'password':
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className={baseClasses}
            placeholder={field.placeholder}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className={baseClasses}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            rows={field.rows || 3}
            className={baseClasses}
            placeholder={field.placeholder}
          />
        );

      case 'file':
        return (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={baseClasses}
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
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Register New {type}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => {
            if (field.fullWidth) {
              return null; // Handle full-width fields separately
            }

            return (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && '*'}
                </label>
                {renderField(field)}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
                {field.hint && (
                  <p className="text-sm text-gray-500 mt-1">{field.hint}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Full-width fields */}
        {fields.filter(f => f.fullWidth).map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && '*'}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
            {field.hint && (
              <p className="text-sm text-gray-500 mt-1">{field.hint}</p>
            )}
          </div>
        ))}

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
            {loading ? `Registering...` : `Register ${type}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;