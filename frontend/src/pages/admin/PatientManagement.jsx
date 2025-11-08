import { useState } from 'react';
import usePatients from '../../hooks/Admin/usePatients';
import DataTable from '../../components/Admin/shared/DataTable';
import RegistrationForm from '../../components/Admin/shared/RegistrationForm';
import DeleteConfirmModal from '../../components/Admin/doctor/deleteconfirmModel';
import { GENDER_OPTIONS, AGE_RANGES  } from '../../utils/Admin/doctorConstants';
import DashboardLayout from '../../components/Admin/admin_dash/DashboardLayout';
import EditModal from '../../components/Admin/shared/EditModal';
import { patientEditFields } from '../../utils/Admin/patientFieldsConfig';
import { validatePatientForm } from '../../utils/Admin/Validations';
import { patientFormConfig } from '../../utils/Admin/formConfig';
import { patientTableColumns } from '../../utils/Admin/tableConfig';
const PatientManagement = () => {
  
  const {
    patients,
    loading,
    error,
    addPatient,
    editPatient,
    removePatient,
    searchPatients,
    filterByGender,
    filterByAgeRange,
  } = usePatients();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    patientId: null,
    patientName: '',
  });
  const [notification, setNotification] = useState(null);


  

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchPatients(query);
  };

  const handleGenderFilter = (e) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    filterByGender(gender);
  };

  const handleAgeRangeFilter = (e) => {
    const ageRange = e.target.value;
    setSelectedAgeRange(ageRange);
    filterByAgeRange(ageRange);
  };

  const handleAddPatient = async (patientData) => {
    const result = await addPatient(patientData);
    if (result.success) {
      setShowAddForm(false);
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
    return result;
  };

  const handleEdit = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (patientData) => {
    const result = await editPatient(selectedPatient.id, patientData);
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
    return result;
  };

  const handleDeleteClick = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    setDeleteModal({
      isOpen: true,
      patientId,
      patientName: patient?.full_name || 'this patient',
    });
  };

  const handleDeleteConfirm = async () => {
    const result = await removePatient(deleteModal.patientId);
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
    setDeleteModal({ isOpen: false, patientId: null, patientName: '' });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50 p-6">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
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

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-[#3B69D4] text-white rounded-lg font-semibold hover:bg-[#2d54b8] transition-all hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Patient
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showAddForm ? (
        <RegistrationForm
          type="Patient"
          fields={patientFormConfig}
          onSubmit={handleAddPatient}
          onCancel={() => setShowAddForm(false)}
          loading={loading}
        />
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search patients by name, email, NIC..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4]"
                  />
                </div>
              </div>
              <div className="md:col-span-1 text-right">
                <span className="text-sm font-medium text-gray-700">Filter</span>
              </div>
              <div className="md:col-span-2">
                <select
                  value={selectedGender}
                  onChange={handleGenderFilter}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] bg-white"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  value={selectedAgeRange}
                  onChange={handleAgeRangeFilter}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B69D4] bg-white"
                >
                  {AGE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <DataTable
            data={patients}
            columns={patientTableColumns}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            emptyMessage="No patients found"
          />
        </>
      )}

      {/*Edit modal*/}
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        fields={patientEditFields}
        data={selectedPatient}
        onSubmit={handleEditSubmit}
        loading={loading}
        type="Patient"
        validateForm={validatePatientForm}

      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, patientId: null, patientName: '' })}
        onConfirm={handleDeleteConfirm}
        doctorName={deleteModal.patientName}
        loading={loading}
      />
    </div>
    </DashboardLayout>
  );
};

export default PatientManagement;