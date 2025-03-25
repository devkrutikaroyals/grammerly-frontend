import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const address = "Nagpur, India"; // Replace with actual address
  const [location, setLocation] = useState({ lat: 21.1458, lng: 79.0882 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAR6wALvqGNfMXu_mR2QQPkqf_W6_UjAwE`
        );
        const data = await response.json();

        if (data.status === "OK") {
          setLocation(data.results[0].geometry.location);
        } else {
          setError(`Geocoding failed: ${data.status}`);
          console.error("Geocoding failed:", data.error_message || data.status);
        }
      } catch (err) {
        setError("Failed to fetch location");
        console.error("Error fetching location:", err);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <LoadScript googleMapsApiKey="" libraries={["places"]}>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "300px" }} center={location} zoom={15}>
        <MarkerF position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
