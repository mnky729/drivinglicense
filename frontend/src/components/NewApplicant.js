import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplicant, recordPhysicalTest, recordTheoreticalTest, recordPracticalTest } from '../services/api';

function NewApplicant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    physical_test: {
      color_blind_check: false,
      farsightedness_check: false,
      astigmatism_check: false,
      body_reflex_check: false
    },
    theoretical_test: {
      traffic_signs_score: 0,
      traffic_lines_score: 0,
      right_of_way_score: 0
    },
    practical_test: {
      status: 'Fail'
    }
  });

  const handleChange = (e, section, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create applicant
      const applicantResponse = await createApplicant({
        first_name: formData.first_name,
        last_name: formData.last_name
      });

      const applicant_id = applicantResponse.id;

      // Submit all tests
      await Promise.all([
        recordPhysicalTest({
          applicant_id,
          ...formData.physical_test
        }),
        recordTheoreticalTest({
          applicant_id,
          ...formData.theoretical_test
        }),
        recordPracticalTest({
          applicant_id,
          ...formData.practical_test
        })
      ]);

      alert('Applicant and test results saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving applicant data:', error);
      alert('Error saving applicant data. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Applicant Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => handleChange(e, null, 'first_name')}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => handleChange(e, null, 'last_name')}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Physical Test */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Physical Test</h3>
          <div className="space-y-2">
            {Object.keys(formData.physical_test).map((check) => (
              <div key={check} className="flex items-center">
                <input
                  type="checkbox"
                  id={check}
                  checked={formData.physical_test[check]}
                  onChange={(e) => handleChange(e, 'physical_test', check)}
                  className="mr-2"
                />
                <label htmlFor={check}>
                  {check.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Theoretical Test */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Theoretical Test</h3>
          <div className="space-y-4">
            {Object.keys(formData.theoretical_test).map((test) => (
              <div key={test}>
                <label className="block mb-1">
                  {test.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.theoretical_test[test]}
                  onChange={(e) => handleChange(e, 'theoretical_test', test)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Practical Test */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Practical Test</h3>
          <div>
            <select
              value={formData.practical_test.status}
              onChange={(e) => handleChange(e, 'practical_test', 'status')}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default NewApplicant;
