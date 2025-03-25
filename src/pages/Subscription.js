import React, { useEffect, useState } from "react";
import "../styles/Subscription.css";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("https://grammerly-backend.onrender.com/api/subscriptions");
        const data = await response.json();
        setSubscriptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Error fetching subscriptions:", error);
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="subscription">
      <h1>Subscription Plans</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="subscription-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Plan Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.users.full_name}</td>
                <td>{sub.package}</td>
                <td>{sub.start_date}</td>
                <td>{sub.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subscription;
