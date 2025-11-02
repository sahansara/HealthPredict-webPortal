import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="w-8 h-8 text-[#3B69D4]" />
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        </div>
        <p className="text-gray-500">View and generate system reports</p>
      </div>

      {/* Blank Content */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center py-16">
          <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">Reports Module</h3>
          <p className="text-gray-500">System reports and analytics will be displayed here</p>
          <p className="text-sm text-gray-400 mt-4">Coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;