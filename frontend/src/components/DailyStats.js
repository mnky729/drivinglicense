import React, { useState, useEffect } from 'react';
import { getDailyStats } from '../services/api';

function DailyStats() {
  const [stats, setStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchStats();
  }, [selectedDate]);

  const fetchStats = async () => {
    try {
      const data = await getDailyStats(selectedDate);
      setStats(data);
    } catch (error) {
      console.error('Error fetching daily stats:', error);
    }
  };

  const calculateTotal = () => {
    return stats.reduce((total, stat) => total + stat.count, 0);
  };

  const getPercentage = (count) => {
    const total = calculateTotal();
    return total ? ((count / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Daily Statistics</h2>
      
      <div className="mb-6">
        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Results Summary</h3>
        
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.overall_status} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{stat.overall_status}:</span>
                <span className="ml-2">{stat.count} applicants</span>
              </div>
              <div className="text-gray-600">
                {getPercentage(stat.count)}%
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>{calculateTotal()} applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyStats;