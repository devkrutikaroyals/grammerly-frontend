import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import UserDetails from "./pages/UserDetails";
import Unsubscription from "./pages/Unsubscription";
import Settings from "./components/Settings";
import PaymentHistory from "./pages/PaymentHistory"; 
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedDarkMode = localStorage.getItem("isDarkMode") === "true";
    setIsAuthenticated(storedAuth);
    setIsDarkMode(storedDarkMode);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark" : "light"} ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Routes>
          {/* Show Login Page if not authenticated */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {/* Protected Routes with Header & Sidebar */}
              <Route
                path="/*"
                element={
                  <>
                    <Header
                      toggleSidebar={toggleSidebar}
                      isSidebarOpen={isSidebarOpen}
                      toggleDarkMode={toggleDarkMode}
                      isDarkMode={isDarkMode}
                      handleLogout={handleLogout}
                    />
                    <div className="content">
                      <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                      <div
                        className="main-container"
                        style={{ flex: 1, marginLeft: isSidebarOpen ? "300px" : "130px", transition: "margin 0.3s ease" }}
                      >
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/subscription" element={<Subscription />} />
                          <Route path="/user-details" element={<UserDetails />} />
                          <Route path="/unsubscription" element={<Unsubscription />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/paymentHistory" element={<PaymentHistory />} />
                          <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </div>
                    </div>
                  </>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
