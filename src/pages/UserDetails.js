import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://grammerly-backend.onrender.com/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.contact_number.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Details", 14, 16);

    autoTable(doc, {
      head: [["User ID", "Email", "Full Name", "Contact Number"]],
      body: users.map((user) => [
        user.uuid,
        user.email,
        user.full_name,
        user.contact_number,
      ]),
      startY: 30,
      styles: { fontSize: 9 },
    });

    doc.save(`user_details_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="user-details-container">
      <div className="page-header">
        <h2>User Details</h2>
        <button onClick={downloadPDF} className="download-button">
          <FaFileDownload className="download-icon" /> Download PDF
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or contact..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>

      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="user-table-container">
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
              {currentRecords.length > 0 ? (
                currentRecords.map((user) => (
                  <tr key={user.uuid}>
                    <td>{user.uuid}</td>
                    <td>{user.email}</td>
                    <td>{user.full_name}</td>
                    <td>{user.contact_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-results">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && filteredUsers.length > recordsPerPage && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
