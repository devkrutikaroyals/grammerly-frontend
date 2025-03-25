import React, { useState, useEffect } from "react";
import "../styles/Unsubscription.css";

function Unsubscription() {
  const [unsubscriptions, setUnsubscriptions] = useState([]);

  useEffect(() => {
    fetchUnsubscriptions();
  }, []);

  const fetchUnsubscriptions = async () => {
    try {
      const response = await fetch("https://grammerly-backend.onrender.com/api/unsubscriptions");
      const data = await response.json();
      console.log("Fetched Data:", data); // ✅ Debugging

      if (response.ok) {
        setUnsubscriptions(data);
      } else {
        console.error("❌ Error fetching unsubscriptions:", data.error);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  // ✅ Toggle Block Status
  const handleBlock = async (id, isBlocked) => {
    try {
      console.log(`🔄 Toggling block status for ID: ${id}, Current Status: ${isBlocked}`);
      const response = await fetch(`https://grammerly-backend.onrender.com/api/unsubscriptions/${id}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_blocked: !isBlocked }),
      });

      if (response.ok) {
        setUnsubscriptions((prev) =>
          prev.map((unsub) =>
            unsub.id === id ? { ...unsub, is_blocked: !isBlocked } : unsub
          )
        );
        console.log(`✅ Successfully updated block status for ID: ${id}`);
      } else {
        console.error("❌ Failed to update block status");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  // ✅ Delete Row
  const handleDelete = async (id) => {
    try {
      console.log(`🗑️ Deleting ID: ${id}`);
      const response = await fetch(`https://grammerly-backend.onrender.com/api/unsubscriptions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUnsubscriptions((prev) => prev.filter((unsub) => unsub.id !== id));
        console.log(`✅ Successfully deleted ID: ${id}`);
      } else {
        console.error("❌ Failed to delete entry");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  return (
    <div className="unsubscription">
      <h1>Unsubscription Page</h1>
      <table className="unsubscription-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Package</th>
            <th>End Date</th>
            <th>Block</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {unsubscriptions.length > 0 ? (
            unsubscriptions.map((unsub) => (
              <tr
                key={unsub.id}
                style={{ backgroundColor: unsub.is_blocked ? "#ffdddd" : "white" }}
              >
                <td>{unsub.users?.full_name || "Unknown"}</td>
                <td>{unsub.email || unsub.users?.email || "No Email"}</td>
                <td>{unsub.package}</td>
                <td>{new Date(unsub.end_date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="block-btn"
                    onClick={() => handleBlock(unsub.id, unsub.is_blocked)}
                    style={{
                      backgroundColor: unsub.is_blocked ? "red" : "green",
                      color: "white",
                    }}
                  >
                    {unsub.is_blocked ? "Unblock" : "Block"}
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(unsub.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No unsubscriptions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Unsubscription;
