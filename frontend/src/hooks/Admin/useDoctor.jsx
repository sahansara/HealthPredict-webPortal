import { useState, useEffect, useCallback } from 'react';
import { getAllDoctors, registerDoctor, updateDoctor, deleteDoctor } from '../../api/admin/DoctorApi';

/**
 * Custom hook for doctor management logic
 * Handles CRUD operations, search, and filtering
 */
const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  /**
   * Fetch doctors with search and filter
   */
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedSpecialization) params.specialization = selectedSpecialization;

      const result = await getAllDoctors(params);

      if (result.success) {
        const doctorsArray = result.data?.data || [];
        setDoctors(doctorsArray);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedSpecialization]);

  /**
   * Add new doctor
   */
  const addDoctor = async (doctorData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Append all doctor data to FormData
      Object.keys(doctorData).forEach((key) => {
        if (doctorData[key] !== null && doctorData[key] !== undefined) {
          formData.append(key, doctorData[key]);
        }
      });

      const result = await registerDoctor(formData);

      if (result.success) {
        await fetchDoctors(); // Refresh the list
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message, errors: result.errors };
      }
    } catch (err) {
      return { success: false, message: 'Failed to register doctor.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing doctor
   */
  const editDoctor = async (id, doctorData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Append all doctor data to FormData
      Object.keys(doctorData).forEach((key) => {
        // Only append if value exists and is not null/undefined
        if (doctorData[key] !== null && doctorData[key] !== undefined) {
          // Skip profile_picture if it's null (no new image selected)
          if (key === 'profile_picture' && doctorData[key] === null) {
            return;
          }
          formData.append(key, doctorData[key]);
        }
      });

      const result = await updateDoctor(id, formData);

      if (result.success) {
        await fetchDoctors(); // Refresh the list
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message, errors: result.errors };
      }
    } catch (err) {
      console.error('Edit doctor error:', err);
      return { success: false, message: 'Failed to update doctor.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete doctor
   */
  const removeDoctor = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteDoctor(id);

      if (result.success) {
        await fetchDoctors(); // Refresh the list
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to delete doctor.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Search doctors
   */
  const searchDoctors = (query) => {
    setSearchQuery(query);
  };

  /**
   * Filter by specialization
   */
  const filterBySpecialization = (specialization) => {
    setSelectedSpecialization(specialization);
  };

  // Fetch doctors on mount and when filters change
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    addDoctor,
    editDoctor,
    removeDoctor,
    searchDoctors,
    filterBySpecialization,
    refreshDoctors: fetchDoctors,
  };
};

export default useDoctors;