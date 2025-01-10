import React, { useState, useEffect } from 'react';
import { getApplicants, searchApplicants } from '../services/api';

function ApplicantList() {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants();
      setApplicants(data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchApplicants(searchTerm);
      setApplicants(data);
    } catch (error) {
      console.error('Error searching applicants:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <table className="min-w-full bg-white border">
        {/* Table contents same as before */}
      </table>
    </div>
  );
}

export default ApplicantList;