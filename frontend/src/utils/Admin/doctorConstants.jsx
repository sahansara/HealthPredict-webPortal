/**
 * Application Constants
 * Theme colors, specializations, and other app-wide constants
 */

export const THEME_COLOR = '#3B69D4';

// Role IDs
export const DOCTOR_ROLE_ID = 2;
export const PATIENT_ROLE_ID = 3;

// Profile
export const DEFAULT_PROFILE_PICTURE = '/assets/default-avatar.png';

// Doctor Specializations
export const SPECIALIZATIONS = [
  { value: '', label: 'All Specializations' },
  { value: 'Cancer', label: 'Cancer / Oncology' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Pediatrics', label: 'Pediatrics' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Psychiatry', label: 'Psychiatry' },
  { value: 'Radiology', label: 'Radiology' },
  { value: 'General Physician', label: 'General Physician' },
  { value: 'ENT', label: 'ENT (Ear, Nose, Throat)' },
];

// Gender Options
export const GENDER_OPTIONS = [
  { value: '', label: 'All Genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Age Ranges for filtering
export const AGE_RANGES = [
  { value: '', label: 'All Ages' },
  { value: '0-18', label: '0-18 years' },
  { value: '19-35', label: '19-35 years' },
  { value: '36-50', label: '36-50 years' },
  { value: '51-65', label: '51-65 years' },
  { value: '66+', label: '66+ years' },
];