import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Subscription.css";
import { supabase } from "../supabaseClient"; // ✅ Centralized import

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase.from("subscriptions").select("*");
      if (error) throw error;
      setSubscriptions(data);
    } catch (err) {
      console.error("Error fetching subscriptions:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Subscription Details", 14, 15);

    autoTable(doc, {
      head: [
        [
          "ID",
          "User ID",
          "Created At",
          "Plan ID",
          "Status",
          "Amount",
          "Currency",
          "Payment Method",
          "Last Payment Date",
          "Next Payment Date",
          "Updated At",
        ],
      ],
      body: subscriptions.map((sub) => [
        sub.id || "-",
        sub.user_id || "-",
        formatDate(sub.created_at),
        sub.plan_id || "-",
        sub.status || "-",
        sub.amount || "-",
        sub.currency || "-",
        sub.payment_method || "-",
        formatDate(sub.last_payment_date),
        formatDate(sub.next_payment_date),
        formatDate(sub.updated_at),
      ]),
      startY: 25,
      styles: {
        fontSize: 8,
        cellWidth: "wrap",
      },
    });

    doc.save("subscriptions_details.pdf");
  };

  return (
    <div className="subscription">
      <h1>Subscription Plans</h1>
      <button className="download-btn" onClick={handleDownloadPDF}>
        Download PDF
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Created At</th>
                <th>Plan ID</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Payment Method</th>
                <th>Last Payment Date</th>
                <th>Next Payment Date</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.user_id}</td>
                  <td>{formatDate(sub.created_at)}</td>
                  <td>{sub.plan_id}</td>
                  <td>{sub.status}</td>
                  <td>{sub.amount}</td>
                  <td>{sub.currency}</td>
                  <td>{sub.payment_method}</td>
                  <td>{formatDate(sub.last_payment_date)}</td>
                  <td>{formatDate(sub.next_payment_date)}</td>
                  <td>{formatDate(sub.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscription;
