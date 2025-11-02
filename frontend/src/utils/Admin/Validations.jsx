/**
 * Validation utility for doctor form
 */

export const validateDoctorForm = (formData) => {
  const errors = {};

  // Validate Doctor ID
  if (!formData.dr_id?.trim()) {
    errors.dr_id = 'Doctor ID is required';
  } else if (formData.dr_id.length < 3) {
    errors.dr_id = 'Doctor ID must be at least 3 characters';
  }

  // Validate Full Name
  if (!formData.full_name?.trim()) {
    errors.full_name = 'Full name is required';
  } else if (formData.full_name.length < 3) {
    errors.full_name = 'Full name must be at least 3 characters';
  }

  // Validate Email
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate Phone
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneDigits = formData.phone.replace(/[\s\-()]/g, '');
    if (!/^\d{10}$/.test(phoneDigits)) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }
  }

  // Validate Specialization
  if (!formData.specialization) {
    errors.specialization = 'Specialization is required';
  }

  // Validate Address
  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  } else if (formData.address.length < 10) {
    errors.address = 'Please enter a complete address (minimum 10 characters)';
  }

  return errors;
};
/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return 'Please upload a valid image (JPG, PNG, GIF)';
  }

  if (file.size > maxSize) {
    return 'Image size must be less than 5MB';
  }

  return null;
};
