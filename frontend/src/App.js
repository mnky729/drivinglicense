import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ApplicantList from './components/ApplicantList';
import NewApplicant from './components/NewApplicant';
import DailyStats from './components/DailyStats';

function App() {
  return (
    <Router>
      <div className="p-4">
        <Navigation />
        <Routes>
          <Route path="/" element={<ApplicantList />} />
          <Route path="/new-applicant" element={<NewApplicant />} />
          <Route path="/daily-stats" element={<DailyStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;