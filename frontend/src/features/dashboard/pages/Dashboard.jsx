import React, { useState } from 'react';

export default function Dashboard() {
  const [stats] = useState([
    { title: 'Total Revenue', value: '\$54,230', change: '+12%' },
    { title: 'Active Users', value: '2,430', change: '+5%' },
    { title: 'New Orders', value: '1,210', change: '-2%' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back to your analytics panel.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="text-sm text-gray-500">Activity table or chart goes here.</div>
      </div>
    </div>
  );
}
