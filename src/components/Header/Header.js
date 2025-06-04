import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, isSidebarOpen, toggleDarkMode, isDarkMode, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    handleLogout(); // Clear authentication state
    navigate('/'); // Redirect to login page
  };

  const handleSettingsClick = () => {
    navigate('/settings'); // Redirect to Settings page
  };

  return (
    <header className={`header ${isSidebarOpen ? '' : 'expanded'} ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <h1>Admin Panel</h1>
      <div className="header-right">
        {/* <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌙'}
        </button> */}
        <div className="profile" onClick={toggleProfile}>
          <span className="profile-icon">👤</span>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <ul>
                <li onClick={handleSettingsClick} style={{ cursor: 'pointer' }}>Settings</li>
                <li onClick={handleLogoutClick} style={{ cursor: 'pointer', color: 'red' }}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
