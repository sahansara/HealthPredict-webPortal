import React, { useState, useEffect } from 'react';
import { Users, UserRound, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from '../../components/Admin/admin_dash/CardIcons';
import DashboardLayout from '../../components/Admin/admin_dash/DashboardLayout';
import { getDashboardStats } from '../../api/admin/DashboardApi';
import auth  from '../../hooks/useAuth';


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    todayAppointments: 0,
    pendingReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = auth();
  const user = getCurrentUser() ?? { full_name: '' };
  console.log('Current User:', user);

  // Dummy data for graphs (replace with API data later)
  const patientRegistrationData = [
    { month: 'Jan', patients: 45 },
    { month: 'Feb', patients: 52 },
    { month: 'Mar', patients: 61 },
    { month: 'Apr', patients: 70 },
    { month: 'May', patients: 85 },
    { month: 'Jun', patients: 95 },
  ];


  const doctorPerformanceData = [
    { name: 'Dr. Smith', patients: 156 },
    { name: 'Dr. Johnson', patients: 142 },
    { name: 'Dr. Williams', patients: 130 },
    { name: 'Dr. Brown', patients: 125 },
    { name: 'Dr. Davis', patients: 118 },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const result = await getDashboardStats();
  
    
    if (result.success) {
      setStats({
        totalDoctors: result.data?.totalDoctors || 45,
        totalPatients: result.data?.totalPatients || 1234,
        todayAppointments: result.data?.todayAppointments || 28,
        pendingReports: result.data?.pendingReports || 12,
      });
    } else {
      // Use dummy data if API fails
      setStats({
        totalDoctors: 45,
        totalPatients: 1234,
        todayAppointments: 28,
        pendingReports: 12,
      });
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview, {user.full_name}
          </h1>
          <p className="text-gray-600 mt-3 text-lg">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon={Users}
            title="Total Doctors"
            value={stats.totalDoctors}
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
            iconColor="text-[#3B69D4]"
            loading={loading}
          />
          <DashboardCard
            icon={UserRound}
            title="Total Patients"
            value={stats.totalPatients}
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
            iconColor="text-green-600"
            loading={loading}
          />
          
          <DashboardCard
            icon={FileText}
            title="Reports"
            value={stats.pendingReports}
            bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
            iconColor="text-orange-600"
            loading={loading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Registration Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-100">
              Patient Registrations (Monthly)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={patientRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#3B69D4" 
                  strokeWidth={3}
                  dot={{ fill: '#3B69D4', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Doctor Performance Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
              Doctor Performance (Patients Handled)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={doctorPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" width={130} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="patients" 
                  fill="#8B5CF6" 
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;