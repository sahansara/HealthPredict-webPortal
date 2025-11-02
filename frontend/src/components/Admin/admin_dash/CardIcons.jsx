import React from 'react';
const DashboardCard = ({ icon: Icon, title, value, bgColor = 'bg-blue-50', iconColor = 'text-blue-600', loading = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          )}
        </div>
        <div className={`${bgColor} ${iconColor} p-4 rounded-full`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;