/**
 * Validation utility for patient form
 */
export const validatePatientForm = (formData) => {
  const errors = {};

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

  // Validate Date of Birth
  if (!formData.date_of_birth) {
    errors.date_of_birth = 'Date of birth is required';
  }

  // Validate Age
  if (!formData.age) {
    errors.age = 'Age is required';
  } else if (formData.age < 0 || formData.age > 150) {
    errors.age = 'Please enter a valid age';
  }

  // Validate Gender
  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  // Validate National ID (Sri Lankan format)
  if (!formData.national_id?.trim()) {
    errors.national_id = 'National ID is required';
  } else {
    const idRegex = /^[A-Za-z0-9]{5,20}$/;
    if (!idRegex.test(formData.national_id)) {
      errors.national_id = 'Invalid ID format (alphanumeric, 5-20 characters)';
    }
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