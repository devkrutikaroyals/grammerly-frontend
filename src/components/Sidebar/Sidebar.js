import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaFileInvoiceDollar, FaUsers, FaHistory } from "react-icons/fa";
import logo from "../../images/log4.png";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logo} alt="Maulayy Logo" className="logo-image" />
      </div>

    
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaTachometerAlt className="icon" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/subscription" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileInvoiceDollar className="icon" />
            {isOpen && <span>Subscription</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/unsubscription" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileInvoiceDollar className="icon" />
            {isOpen && <span>Unsubscription</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-details" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers className="icon" />
            {isOpen && <span>User Details</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHistory className="icon" />
            {isOpen && <span>History</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/paymentHistory" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUser className="icon" />
            {isOpen && <span>Payment History</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
