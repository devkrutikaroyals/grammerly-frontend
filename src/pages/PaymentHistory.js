import React, { useState } from "react";
import "../styles/Subscription.css"; // Using the same styling

const PaymentHistory = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      user_email: "john@example.com",
      contact_no: "1234567890",
      address: "123 Main St, New York",
      transaction_id: "TXN12345",
      picture: "https://via.placeholder.com/50",
      amount: "$49.99",
      isActive: true,
    },
    {
      user_email: "jane@example.com",
      contact_no: "9876543210",
      address: "456 Elm St, California",
      transaction_id: "TXN54321",
      picture: "https://via.placeholder.com/50",
      amount: "$29.99",
      isActive: false,
    },
  ]);

  const handleDownloadCSV = () => {
    const headers = [
      "User Email",
      "Contact No",
      "Address",
      "Transaction ID",
      "Picture",
      "Amount",
      "Status",
    ];
    
    const rows = subscriptions.map(sub => [
      sub.user_email,
      sub.contact_no,
      sub.address,
      sub.transaction_id,
      sub.picture,
      sub.amount,
      sub.isActive ? "Active" : "Inactive"
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(item => `"${item}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payment_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleStatus = (index) => {
    const updated = subscriptions.map((sub, i) =>
      i === index ? { ...sub, isActive: !sub.isActive } : sub
    );
    setSubscriptions(updated);
  };

  return (
    <div className="subscription">
      <div className="header-section">
        <h1>Payment History</h1>
        <button className="download-btn" onClick={handleDownloadCSV}>
          Download CSV
        </button>
      </div>

      <div className="table-container">
        <table className="subscription-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Contact No</th>
              <th>Address</th>
              <th>Transaction ID</th>
              <th>Picture</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index}>
                <td>{sub.user_email}</td>
                <td>{sub.contact_no}</td>
                <td>{sub.address}</td>
                <td>{sub.transaction_id}</td>
                <td>
                  <img
                    src={sub.picture}
                    alt="Payment"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{sub.amount}</td>
                <td>
                  <button
                    className={`status-btn ${sub.isActive ? "active" : "inactive"}`}
                    onClick={() => toggleStatus(index)}
                  >
                    {sub.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
