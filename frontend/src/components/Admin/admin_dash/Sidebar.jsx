import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, FileText, Bell, LogOut, Menu, X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import { getDoctorCount, getPatientCount } from '../../../api/admin/DashboardApi';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
  });

  // Fetch counts on mount
  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const [doctorResult, patientResult] = await Promise.all([
      getDoctorCount(),
      getPatientCount(),
    ]);

    setCounts({
      doctors: doctorResult.data?.count || 0,
      patients: patientResult.data?.count || 0,
    });
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      count: null,
    },
    {
      path: '/admin/doctors',
      icon: Users,
      label: 'Doctor Management',
      count: counts.doctors,
    },
    {
      path: '/admin/patients',
      icon: UserRound,
      label: 'Patient Management',
      count: counts.patients,
    },
    {
      path: '/admin/reports',
      icon: FileText,
      label: 'Reports',
      count: null,
    },
    {
      path: '/admin/notifications',
      icon: Bell,
      label: 'Notifications',
      count: null,
    },
  ];

  const handleLogout = async () => {
    await logout(navigate);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#3B69D4] text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-[#3B69D4]">HealthPredict</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-[#3B69D4] text-white shadow-md'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-[#3B69D4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.count !== null && (
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            isActive(item.path)
                              ? 'bg-white text-[#3B69D4]'
                              : 'bg-[#3B69D4] text-white'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>

    
  );
};

export default Sidebar;