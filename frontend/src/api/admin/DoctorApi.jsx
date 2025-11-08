import authApi from '../authApi';

/**
 * Get all doctors
 */
export const getAllDoctors = async (params = {}) => {
  try {
    const response = await authApi.get('/admin/doctors', { params });
    console.log('getAllDoctors response:', response);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('getAllDoctors error:', error);
    return {
      
      success: false,
      message: error.response?.data?.message || 'Failed to fetch doctors.',
     
      errors: error.response?.data?.errors || {},
      
    };
  }
};

/**
 * Get single doctor by ID
 */
export const getDoctorById = async (id) => {
  try {
    const response = await authApi.get(`/admin/doctor/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch doctor details.',
    };
  }
};

/**
 * Register new doctor Admin only
 */
export const registerDoctor = async (doctorData) => {
  try {
    const response = await authApi.post('/admin/doctor/register', doctorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Doctor registered successfully!',
    };
  } catch (error) {
    console.error('registerDoctor error:', error);
    console.error('registerDoctor error response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to register doctor.',
      errors: error.response?.data?.errors || {},
      
    };
  }
};

/**
 * Update doctor information
 */

export const updateDoctor = async (id, doctorData) => {
  try {
    // Add _method field to the FormData to simulate PUT request
    doctorData.append('_method', 'PUT');
    
    const response = await authApi.post(`/admin/doctor/update/${id}`, doctorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Doctor updated successfully!',
    };
  } catch (error) {
    console.error('updateDoctor error:', error);
    console.error('updateDoctor error response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update doctor.',
      errors: error.response?.data?.errors || {},
    };
  }
};
/**
 * Delete doctor
 */
export const deleteDoctor = async (id) => {
  try {
    const response = await authApi.delete(`/admin/doctor/delete/${id}`);
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Doctor deleted successfully!',
    };
  } catch (error) {
    console.error('deleteDoctor error:', error);
    console.error('deleteDoctor error response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete doctor.',
    };
  }
};