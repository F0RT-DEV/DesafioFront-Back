import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, MapPin, Thermometer } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="nav-bar">
      <div className="logo">
        <Thermometer className="logo-icon" size={24} />
        <span className="logo-text">ClimaMonitor</span>
      </div>
      
      <div className="nav-links">
        <Link 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
          to="/"
        >
          <BarChart3 size={18} />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          className={`nav-link ${location.pathname === '/locations' ? 'active' : ''}`} 
          to="/locations"
        >
          <MapPin size={18} />
          <span>Locais</span>
        </Link>
        
        <Link 
          className={`nav-link ${location.pathname === '/records' ? 'active' : ''}`} 
          to="/records"
        >
          <Thermometer size={18} />
          <span>Registros</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;