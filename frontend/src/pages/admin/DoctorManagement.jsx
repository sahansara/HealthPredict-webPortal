import React, { useState } from 'react';
import useDoctors from '../../hooks/Admin/useDoctor';
import DoctorTable from '../../components/Admin/doctor/DoctorTable';
import DoctorForm from '../../components/Admin/doctor/DoctorForm';
import DoctorEditModal from '../../components/Admin/doctor/DoctorEditModal';
import DeleteConfirmModal from '../../components/Admin/doctor/deleteconfirmModel';
import { SPECIALIZATIONS } from '../../utils/Admin/doctorConstants';
import DashboardLayout from '../../components/Admin/admin_dash/DashboardLayout';

const DoctorManagement = () => {
  const {
    doctors,
    loading,
    error,
    addDoctor,
    editDoctor,
    removeDoctor,
    searchDoctors,
    filterBySpecialization,
  } = useDoctors();

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  
  // Edit Modal State
  const [editModal, setEditModal] = useState({
    isOpen: false,
    doctor: null,
  });
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    doctorId: null,
    doctorName: '',
  });
  
  const [notification, setNotification] = useState(null);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchDoctors(query);
  };

  // Handle specialization filter
  const handleFilterChange = (e) => {
    const specialization = e.target.value;
    setSelectedSpecialization(specialization);
    filterBySpecialization(specialization);
  };

  // Handle add doctor
  const handleAddDoctor = async (doctorData) => {
    const result = await addDoctor(doctorData);

    if (result.success) {
      setShowAddForm(false);
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }

    return result;
  };

  // Handle edit doctor - Open modal
  const handleEdit = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      setEditModal({
        isOpen: true,
        doctor: doctor,
      });
    }
  };

  // Handle edit doctor submission
  const handleEditSubmit = async (doctorData) => {
    const result = await editDoctor(editModal.doctor.id, doctorData);

    if (result.success) {
      showNotification(result.message || 'Doctor updated successfully', 'success');
      setEditModal({ isOpen: false, doctor: null });
      return { success: true };
    } else {
      showNotification(result.message || 'Failed to update doctor', 'error');
      return { success: false, errors: result.errors };
    }
  };

  // Handle delete doctor
  const handleDeleteClick = (doctorId, doctorName) => {
    setDeleteModal({
      isOpen: true,
      doctorId,
      doctorName,
    });
  };

  const handleDeleteConfirm = async () => {
    const result = await removeDoctor(deleteModal.doctorId);

    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }

    setDeleteModal({ isOpen: false, doctorId: null, doctorName: '' });
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all animate-slide-in ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-[#3B69D4] text-white rounded-lg font-semibold hover:bg-[#2d54b8] transition-all hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add Doctor Form */}
      {showAddForm ? (
        <DoctorForm
          onSubmit={handleAddDoctor}
          onCancel={() => setShowAddForm(false)}
          loading={loading}
        />
      ) : (
        <>
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Input */}
              <div className="md:col-span-8">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search doctors by name, email..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4]"
                  />
                </div>
              </div>

              {/* Filter Label */}
              <div className="md:col-span-1 text-right">
                <span className="text-sm font-medium text-gray-700">Filter</span>
              </div>

              {/* Specialization Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedSpecialization}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] bg-white"
                >
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec.value} value={spec.value}>
                      {spec.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Doctor Table */}
          <DoctorTable
            doctors={doctors}
            loading={loading}
            onEdit={handleEdit}
            onDelete={(id) => {
              const doctor = doctors.find((d) => d.id === id);
              handleDeleteClick(id, doctor?.full_name || 'this doctor');
            }}
          />
        </>
      )}

      {/* Edit Doctor Modal */}
      <DoctorEditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, doctor: null })}
        doctor={editModal.doctor}
        onSubmit={handleEditSubmit}
        loading={loading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, doctorId: null, doctorName: '' })}
        onConfirm={handleDeleteConfirm}
        doctorName={deleteModal.doctorName}
        loading={loading}
      />
    </div>
    </DashboardLayout>
  );
};

export default DoctorManagement;