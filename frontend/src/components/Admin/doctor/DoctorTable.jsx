import React from 'react';
import { DEFAULT_PROFILE_PICTURE } from '../../../utils/Admin/doctorConstants';

const DoctorTable = ({ doctors, loading, onEdit, onDelete }) => {
  const doctorsList = Array.isArray(doctors) ? doctors : [];
  
  console.log('doctors:', doctors);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B69D4]"></div>
      </div>
    );
  }

  if (doctorsList.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by registering a new doctor.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Profile
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Specialization
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Phone
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doctorsList.map((doctor) => (
            <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
              {/* Profile Picture */}
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={doctor.profile_picture_url || DEFAULT_PROFILE_PICTURE}
                  alt={doctor.full_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = DEFAULT_PROFILE_PICTURE;
                  }}
                />
              </td>
              {/* doctor ID */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doctor.dr_id}
              </td>


              {/* Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {doctor.full_name}
                </div>
              </td>

              {/* Specialization */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {doctor.specialization}
                </span>
              </td>

              {/* Phone */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doctor.phone}
              </td>

              {/* Email */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doctor.email}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(doctor.id)}
                    className="px-4 py-2 bg-[#3B69D4] text-white text-sm font-medium rounded-lg hover:bg-[#2d54b8] transition-all hover:shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(doctor.id)}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all hover:shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;