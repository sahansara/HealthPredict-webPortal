import { GENDER_OPTIONS, SPECIALIZATIONS , DOCTOR_ROLE_ID , PATIENT_ROLE_ID } from './doctorConstants';

export const patientFormConfig = [

{
      name: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'John Doe',
      validation: (value) => value && value.trim() ? true : 'Full name is required',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'patient@example.com',
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !value.trim()) return 'Email is required';
        const email = value.trim();
        if (!emailRegex.test(email)) return 'Invalid email format';
        return true;
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: '0771234567',
      validation: (value) => value && value.trim() ? true : 'Phone number is required',
    },
    {
      name: 'date_of_birth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      validation: (value) => value ? true : 'Date of birth is required',
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: '25',
      validation: (value) => {
        if (value === undefined || value === null || value === '') return 'Age is required';
        if (value < 0 || value > 150) return 'Invalid age';
        return true;
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      placeholder: 'Select Gender',
      options: GENDER_OPTIONS.filter(g => g.value),
      validation: (value) => value ? true : 'Gender is required',
    },
    {
      name: 'national_id',
      label: 'National ID',
      type: 'text',
      required: true,
      placeholder: '123456789V',
      validation: (value) => {
        if (!value || !value.trim()) return 'National ID is required';
        // Sri Lankan NIC format: 9 digits + V or 12 digits
        const nic = value.trim();
        const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
        if (!nicRegex.test(nic)) return 'Invalid Sri Lankan NIC format';
        return true;
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      fullWidth: true,
      placeholder: 'Enter full address',
      rows: 3,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      validation: (value) => value && value.trim() ? true : 'Password is required',
    },
    {
      name: 'profile_picture',
      label: 'Profile Picture',
      type: 'file',
      fullWidth: true,
    },
    {
      name: 'role_id',
      defaultValue: PATIENT_ROLE_ID,
    },
  ];


export const doctorFormConfig = [
    {
          name: 'full_name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Dr. John Doe',
          validation: (value) => value && value.trim() ? true : 'Full name is required',
        },
        {
          name: 'dr_id',
          label: 'Doctor ID',
          type: 'text',
          required: true,
          placeholder: 'DR123',
          validation: (value) => value && value.trim() ? true : 'Doctor ID is required',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'doctor@medicore.com',
          validation: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !value.trim()) return 'Email is required';
            const email = value.trim();
            if (!emailRegex.test(email)) return 'Invalid email format';
            return true;
          },
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          required: true,
          placeholder: '0771234567',
          validation: (value) => value && value.trim() ? true : 'Phone number is required',
        },
        {
          name: 'specialization',
          label: 'Specialization',
          type: 'select',
          required: true,
          placeholder: 'Select Specialization',
          options: SPECIALIZATIONS.filter(s => s.value),
          validation: (value) => value ? true : 'Specialization is required',
        },
        {
          name: 'address',
          label: 'Address',
          type: 'textarea',
          fullWidth: true,
          placeholder: 'Enter full address',
          rows: 3,
        },
        {
          name: 'password',
          label: 'Temporary Password',
          type: 'password',
          required: true,
          fullWidth: true,
          placeholder: 'Enter temporary password',
          hint: 'Doctor will be required to change this on first login',
          validation: (value) => {
            if (!value || !value.trim()) return 'Temporary password is required';
            if ((value || '').length < 6) return 'Password must be at least 6 characters';
            return true;
          },
        },
        {
          name: 'profile_picture',
          label: 'Profile Picture',
          type: 'file',
          fullWidth: true,
        },
        {
          name: 'role_id',
          defaultValue: DOCTOR_ROLE_ID,
        },
    ];