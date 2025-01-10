import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
        </li>
        <li>
          <Link to="/new-applicant" className="text-blue-500 hover:text-blue-700">New Applicant</Link>
        </li>
        <li>
          <Link to="/daily-stats" className="text-blue-500 hover:text-blue-700">Daily Statistics</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;