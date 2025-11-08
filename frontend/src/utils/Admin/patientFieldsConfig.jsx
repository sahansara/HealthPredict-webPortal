import { User, Mail, Phone, MapPin, Calendar, Hash } from 'lucide-react';
import { GENDER_OPTIONS } from './doctorConstants';

/**
 * Patient edit form fields configuration
 */
export const patientEditFields = [
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'text',
    icon: User,
    placeholder: 'John Doe',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: Mail,
    placeholder: 'patient@example.com',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    icon: Phone,
    placeholder: '0771234567',
    required: true,
  },
  {
    name: 'date_of_birth',
    label: 'Date of Birth',
    type: 'date',
    icon: Calendar,
    required: true,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    icon: Hash,
    placeholder: '25',
    required: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    icon: User,
    required: true,
    options: GENDER_OPTIONS.filter(g => g.value !== ''), 
  },
  {
    name: 'national_id',
    label: 'National ID',
    type: 'text',
    icon: Hash,
    placeholder: '123456789V or 123456789012',
    required: true,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    icon: MapPin,
    placeholder: 'Enter full address',
    rows: 3,
    required: true,
  },
];