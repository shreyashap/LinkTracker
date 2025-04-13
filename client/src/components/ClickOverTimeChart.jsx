import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const ClicksOverTimeChart = ({ data, loading }) => {
  // Convert object to array for recharts
  const formattedData = Object.entries(data || {}).map(([date, clicks]) => ({
    date,
    clicks,
  }));

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
          No click data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-xl p-6 border dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Clicks Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClicksOverTimeChart;
