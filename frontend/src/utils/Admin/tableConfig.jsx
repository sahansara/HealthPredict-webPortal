 import { DEFAULT_PROFILE_PICTURE } from '../../utils/Admin/doctorConstants';
 export const patientTableColumns = [
 
 {
      key: 'profile_picture',
      label: 'Profile',
      render: (row) => (
        <img
          src={row.profile_picture_url || DEFAULT_PROFILE_PICTURE}
          alt={row.full_name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => { e.target.src = DEFAULT_PROFILE_PICTURE; }}
        />
      ),
    },
    {
      key: 'full_name',
      label: 'Name',
      render: (row) => (
        <div className="text-sm font-medium text-gray-900">{row.full_name}</div>
      ),
    },
    {
      key: 'national_id',
      label: 'National ID',
      render: (row) => <span className="text-sm text-gray-700">{row.national_id}</span>,
    },
    {
      key: 'age',
      label: 'Age',
      render: (row) => <span className="text-sm text-gray-700">{row.age} years</span>,
    },
    {
      key: 'gender',
      label: 'Gender',
      render: (row) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
          row.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.gender}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (row) => <span className="text-sm text-gray-700">{row.phone}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-sm text-gray-700">{row.email}</span>,
    },

    ];


export const doctorTableColumns = [
    {
      key: 'profile_picture',
      label: 'Profile',
      render: (row) => (
        <img
          src={row.profile_picture_url || DEFAULT_PROFILE_PICTURE}
          alt={row.full_name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => { e.target.src = DEFAULT_PROFILE_PICTURE; }}
        />
      ),
    },
    {
      key: 'full_name',
      label: 'Name',
      render: (row) => (
        <div className="text-sm font-medium text-gray-900">{row.full_name}</div>
      ),
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (row) => (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {row.specialization}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (row) => <span className="text-sm text-gray-700">{row.phone}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-sm text-gray-700">{row.email}</span>,
    },
    ];