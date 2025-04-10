import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Unsubscription.css";
import { supabase } from "../supabaseClient"; // ✅ Import from central config

function Unsubscription() {
  const [unsubscriptions, setUnsubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUnsubscriptions();
  }, []);

  const fetchUnsubscriptions = async () => {
    try {
      const { data, error } = await supabase.from("unsubscriptions").select("*");
      if (error) throw error;
      setUnsubscriptions(data);
    } catch (error) {
      console.error("Error fetching unsubscriptions:", error.message);
      setUnsubscriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Unsubscription List", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [
        [
          "ID",
          "User ID",
          "Subscription ID",
          "Email",
          "Package",
          "End Date",
          "Is Blocked",
          "Is Deleted",
          "Created At",
        ],
      ],
      body: unsubscriptions.map((unsub) => [
        unsub.id || "-",
        unsub.user_id || "-",
        unsub.subscription_id || "-",
        unsub.email || "No Email",
        unsub.package || "-",
        formatDate(unsub.end_date),
        unsub.is_blocked ? "Yes" : "No",
        unsub.is_deleted ? "Yes" : "No",
        formatDateTime(unsub.created_at),
      ]),
      styles: {
        fontSize: 8,
        cellWidth: "wrap",
      },
    });

    doc.save("unsubscriptions.pdf");
  };

  return (
    <div className="unsubscription">
      <h1>Unsubscription Page</h1>
      <button className="download-btn" onClick={handleDownloadPDF}>
        Download PDF
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="unsubscription-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Subscription ID</th>
                <th>Email</th>
                <th>Package</th>
                <th>End Date</th>
                <th>Is Blocked</th>
                <th>Is Deleted</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {unsubscriptions.map((unsub) => (
                <tr key={unsub.id}>
                  <td>{unsub.id}</td>
                  <td>{unsub.user_id}</td>
                  <td>{unsub.subscription_id}</td>
                  <td>{unsub.email || "No Email"}</td>
                  <td>{unsub.package}</td>
                  <td>{formatDate(unsub.end_date)}</td>
                  <td>{unsub.is_blocked ? "Yes" : "No"}</td>
                  <td>{unsub.is_deleted ? "Yes" : "No"}</td>
                  <td>{formatDateTime(unsub.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Unsubscription;
