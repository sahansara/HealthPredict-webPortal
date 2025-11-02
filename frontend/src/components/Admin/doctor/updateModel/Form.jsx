import React from 'react';
import { User, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';
import { SPECIALIZATIONS } from '../../../../utils/Admin/doctorConstants';

const DoctorEditFormFields = ({ formData, errors, onChange, disabled }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Doctor ID */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Doctor ID <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            name="dr_id"
            value={formData.dr_id}
            onChange={onChange}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
              errors.dr_id ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., DR001"
            disabled={disabled}
          />
        </div>
        {errors.dr_id && (
          <p className="text-red-500 text-xs mt-1">{errors.dr_id}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Dr. John Smith"
            disabled={disabled}
          />
        </div>
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="doctor@hospital.com"
            disabled={disabled}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234567890"
            disabled={disabled}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Specialization <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Stethoscope className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
          <select
            name="specialization"
            value={formData.specialization}
            onChange={onChange}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] bg-white appearance-none ${
              errors.specialization ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled}
          >
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.specialization && (
          <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute left-2 sm:left-3 top-2 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows="3"
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Medical Center, City, Country"
            disabled={disabled}
          />
        </div>
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>
    </div>
  );
};

export default DoctorEditFormFields;