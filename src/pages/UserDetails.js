import React, { useEffect, useState } from "react";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch Users from Backend
  useEffect(() => {
    fetch("https://grammerly-backend.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.uuid}>
                <td>{user.uuid}</td>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>{user.contact_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
