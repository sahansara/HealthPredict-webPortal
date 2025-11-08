import React from 'react';

const EditFormFields = ({ formData, errors, onChange, disabled, fields }) => {
  const renderField = (field) => {
    const baseInputClass = `w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
      errors[field.name] ? 'border-red-500' : 'border-gray-300'
    }`;

    const baseTextareaClass = `w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] resize-none ${
      errors[field.name] ? 'border-red-500' : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
      case 'number':
        return (
          <div className="relative">
            {field.icon && (
              <field.icon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={onChange}
              className={baseInputClass}
              placeholder={field.placeholder}
              disabled={disabled}
            />
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            {field.icon && (
              <field.icon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
            )}
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={onChange}
              className={`${baseInputClass} bg-white appearance-none`}
              disabled={disabled}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            {field.icon && (
              <field.icon className="absolute left-2 sm:left-3 top-2 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={onChange}
              rows={field.rows || 3}
              className={baseTextareaClass}
              placeholder={field.placeholder}
              disabled={disabled}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditFormFields;