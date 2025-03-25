import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalSubscriptions, setTotalSubscriptions] = useState(null);
  const [totalUnsubscriptions, setTotalUnsubscriptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, subsRes, unsubsRes] = await Promise.all([
          fetch("https://grammerly-backend.onrender.com/api/users/count"),
          fetch("https://grammerly-backend.onrender.com/api/subscriptions/count"),
          fetch("https://grammerly-backend.onrender.com/api/unsubscriptions/count")
        ]);

        if (!usersRes.ok || !subsRes.ok || !unsubsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [usersData, subsData, unsubsData] = await Promise.all([
          usersRes.json(),
          subsRes.json(),
          unsubsRes.json()
        ]);

        setTotalUsers(usersData.totalUsers || 0);
        setTotalSubscriptions(subsData.totalSubscriptions || 0);
        setTotalUnsubscriptions(unsubsData.totalUnsubscriptions || 0);
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="card-container">
        <div className="card">
          {isLoading ? <p>Loading...</p> : <><h2>Total Users</h2><p>{totalUsers}</p></>}
        </div>
        <div className="card">
          {isLoading ? <p>Loading...</p> : <><h2>Total Subscriptions</h2><p>{totalSubscriptions}</p></>}
        </div>
        <div className="card">
          {isLoading ? <p>Loading...</p> : <><h2>Total Unsubscriptions</h2><p>{totalUnsubscriptions}</p></>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
