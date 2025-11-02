import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { UserRound, Plus, List } from 'lucide-react';

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <UserRound className="w-8 h-8 text-[#3B69D4]" />
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        </div>
        <p className="text-gray-500">Manage all patients in the system</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'list'
                ? 'bg-[#3B69D4] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
            Patient List
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'add'
                ? 'bg-[#3B69D4] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5" />
            Add New Patient
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'list' && (
            <div className="text-center py-16">
              <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Patient List</h3>
              <p className="text-gray-500">This section will display all patients</p>
              <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
            </div>
          )}

          {activeTab === 'add' && (
            <div className="text-center py-16">
              <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Add New Patient</h3>
              <p className="text-gray-500">Form to add new patient will appear here</p>
              <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientManagement;