import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Locations from './pages/Locations';
import Records from './pages/Records';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registro/:id" element={<Dashboard />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}
