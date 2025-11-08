import authApi from '../authApi';

/**
 * Get all patients
 */
export const getAllPatients = async (params = {}) => {
  try {
    const response = await authApi.get('/admin/patients', { params });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch patients.',
      errors: error.response?.data?.errors || {},
    };
  }
};

/**
 * Get single patient by ID
 */
export const getPatientById = async (id) => {
  try {
    const response = await authApi.get(`/admin/patient/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch patient details.',
    };
  }
};

/**
 * Register new patient (Admin only)
 */
export const registerPatient = async (patientData) => {
  try {
    const response = await authApi.post('/admin/patient/register', patientData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Patient registered successfully!',
    };
  } catch (error) {
    console.error('Error registering patient:', error);
    console.error('Error response data:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to register patient.',
      errors: error.response?.data?.errors || {},
    };
  }
};

/**
 * Update patient information
 
 */
export const updatePatient = async (id, patientData) => {
  try {
    // Add _method field to the FormData to simulate PUT request
    patientData.append('_method', 'PUT');
    
    
    const response = await authApi.post(`/admin/patient/update/${id}`, patientData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Patient updated successfully!',
    };
  } catch (error) {
    console.error('updatePatient error:', error);
    console.error('updatePatient error response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update patient.',
      errors: error.response?.data?.errors || {},
    };
  }
};

/**
 * Delete patient
 */
export const deletePatient = async (id) => {
  try {
    const response = await authApi.delete(`/admin/patient/delete/${id}`);
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Patient deleted successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete patient.',
    };
  }
};