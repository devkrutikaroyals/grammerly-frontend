
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Settings.css";

const API_URL = "http://localhost:5000/api"; // Ensure this matches your backend server URL

const Settings = () => {
  const [adminDetails, setAdminDetails] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "Admin",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto") || "default-profile.png");
  const [activeSection, setActiveSection] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/`, {
        params: { email: "admin@gmail.com" },
      });
  
      if (response.data) {
        setAdminDetails(response.data);

        console.log(response.data);
        
        localStorage.setItem("admin", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching admin:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };
  
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {  console.log(adminDetails);

      const response = await axios.put(`${API_URL}/admin/update`, {
        email: adminDetails.email, // Send email in request
        name: adminDetails.name,
        phone: adminDetails.phone,
      });
  
      console.log("Profile updated successfully:", response.data);
      setUpdateMessage("Profile updated successfully!");
      
      // Update local storage with the new details
      localStorage.setItem("admin", JSON.stringify({ ...adminDetails }));
  
    } catch (error) {
      console.error("Profile update failed:", error);
      setUpdateMessage("Profile update failed. Check console for details.");
    }
  };
  

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      console.log(oldPassword);
      console.log(newPassword);
      
      
      const payload = {
        email: adminDetails.email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const response = await axios.put(`${API_URL}/admin/change-password`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Password updated successfully:", response.data);
      setUpdateMessage("Password updated successfully!");
    } catch (error) {
      console.error("Password update failed:", error.response?.data || error.message);
      setUpdateMessage("Password update failed. Check console for details.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${API_URL}/admin/delete`, { data: { id: adminDetails.id } });
        localStorage.removeItem("admin");
        localStorage.removeItem("profilePhoto");
        alert("Account deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>
      <div className="profile-section">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </div>

      <div className="settings-menu">
        <button onClick={() => setActiveSection("editProfile")} className={activeSection === "editProfile" ? "active" : ""}>
          Edit Profile
        </button>
        <button onClick={() => setActiveSection("changePassword")} className={activeSection === "changePassword" ? "active" : ""}>
          Change Password
        </button>
        <button onClick={() => setActiveSection("deleteAccount")} className={activeSection === "deleteAccount" ? "active" : ""}>
          Delete Account
        </button>
      </div>

      {activeSection === "editProfile" && (
        <form onSubmit={handleUpdateDetails} className="settings-form">
          <label>Name:</label>
          <input type="text" name="name" value={adminDetails.name} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" name="email" value={adminDetails.email} disabled required/>
          <label>Phone:</label>
          <input type="text" name="phone" value={adminDetails.phone} onChange={handleChange} required />
          <button type="submit">Update Profile</button>
          {updateMessage && <p className="update-message">{updateMessage}</p>}
        </form>
      )}

      {activeSection === "changePassword" && (
        <form onSubmit={handleUpdatePassword} className="settings-form">
          <label>Old Password:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Update Password</button>
          {updateMessage && <p className="update-message">{updateMessage}</p>}
        </form>
      )}

      {activeSection === "deleteAccount" && (
        <div className="settings-form">
          <h3>Danger Zone</h3>
          <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default Settings;