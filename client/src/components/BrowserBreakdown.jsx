import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const COLORS = ["#6366f1", "#60a5fa", "#f472b6", "#34d399", "#facc15"];

const DeviceBreakdownChart = ({ data, loading }) => {
  // Convert object into array of objects for Recharts
  const formattedData = Object.entries(data || {}).map(
    ([browserName, count]) => ({
      browserName,
      count,
    })
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-xl p-6 border dark:border-gray-700 h-[300px] flex items-center justify-center">
        <p className="text-gray-800 dark:text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  if (!formattedData.length) {
    return (
      <div className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-xl p-6 border dark:border-gray-700 h-[300px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No device data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-xl p-6 border dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Device Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="count"
            nameKey="browserName"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceBreakdownChart;
