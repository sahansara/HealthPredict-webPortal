import { User, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';
import { SPECIALIZATIONS } from './doctorConstants';

/**
 * Doctor edit form fields configuration
 */
export const doctorEditFields = [
  {
    name: 'dr_id',
    label: 'Doctor ID',
    type: 'text',
    icon: User,
    placeholder: 'e.g., DR001',
    required: true,
  },
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'text',
    icon: User,
    placeholder: 'Dr. John Smith',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: Mail,
    placeholder: 'doctor@hospital.com',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    icon: Phone,
    placeholder: '1234567890',
    required: true,
  },
  {
    name: 'specialization',
    label: 'Specialization',
    type: 'select',
    icon: Stethoscope,
    required: true,
    options: SPECIALIZATIONS,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    icon: MapPin,
    placeholder: '123 Medical Center, City, Country',
    rows: 3,
    required: true,
  },
];