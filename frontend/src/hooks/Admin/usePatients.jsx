import { useState, useEffect, useCallback } from 'react';
import { getAllPatients, registerPatient, updatePatient, deletePatient } from '../../api/admin/PatientApi';

/**
 * Custom hook for patient management logic
 * Handles CRUD operations, search, and filtering
 */
const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');

  /**
   * Fetch patients with search and filter
   */
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedGender) params.gender = selectedGender;
      if (selectedAgeRange) params.age_range = selectedAgeRange;

      const result = await getAllPatients(params);

      if (result.success) {
        const patientsArray = result.data?.data || [];
        setPatients(patientsArray);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to load patients. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGender, selectedAgeRange]);

  /**
   * Add new patient
   */
  const addPatient = async (patientData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      Object.keys(patientData).forEach((key) => {
        if (patientData[key] !== null && patientData[key] !== undefined) {
          formData.append(key, patientData[key]);
        }
      });

      const result = await registerPatient(formData);

      if (result.success) {
        await fetchPatients();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message, errors: result.errors };
      }
    } catch (err) {
      return { success: false, message: 'Failed to register patient.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing patient
   */
  const editPatient = async (id, patientData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      Object.keys(patientData).forEach((key) => {
        const value = patientData[key];

        // Skip null/undefined/empty values
        if (value === null || value === undefined || value === '') {
          return;
        }

        // Only append profile_picture if it's a File/Blob skip existing URL/string
        if (key === 'profile_picture') {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          }
          return;
        }

        formData.append(key, value);
      });

      const result = await updatePatient(id, formData);

      if (result.success) {
        await fetchPatients();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message, errors: result.errors };
      }
    } catch (err) {
      console.error('updatePatients errors:', err);
      return { success: false, message: 'Failed to update patient.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete patient
   */
  const removePatient = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deletePatient(id);

      if (result.success) {
        await fetchPatients();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to delete patient.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Search patients
   */
  const searchPatients = (query) => {
    setSearchQuery(query);
  };

  /**
   * Filter by gender
   */
  const filterByGender = (gender) => {
    setSelectedGender(gender);
  };

  /**
   * Filter by age range
   */
  const filterByAgeRange = (ageRange) => {
    setSelectedAgeRange(ageRange);
  };

  // Fetch patients on mount and when filters change
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    error,
    addPatient,
    editPatient,
    removePatient,
    searchPatients,
    filterByGender,
    filterByAgeRange,
    refreshPatients: fetchPatients,
  };
};

export default usePatients;