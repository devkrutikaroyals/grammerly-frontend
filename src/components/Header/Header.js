import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, isSidebarOpen, toggleDarkMode, isDarkMode, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto") || "default-profile.png");
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhoto = localStorage.getItem("profilePhoto");
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }

    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin && storedAdmin.name) {
      setAdminName(storedAdmin.name);
    }
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <header className={`header ${isSidebarOpen ? '' : 'expanded'} ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <h1>Admin Panel</h1>
      <div className="header-right">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        <div className="profile" onClick={toggleProfile}>
          <img src={profilePhoto} alt="Profile" className="profile-icon" />
          <p className="profile-name">{adminName}</p>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>{adminName}</li>
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
