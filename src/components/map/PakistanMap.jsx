import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./PakistanMap.css"; // Ensure you have this CSS file
import { Card, CardContent, Typography } from "@mui/material";

const defaultStyle = {
  fillColor: "#01411C", // Base color of provinces
  weight: 1, // Make borders thicker
  opacity: 1,
  color: "#FFFFFF", // Set border color to white
  fillOpacity: 1,
};

const highlightStyle = {
  weight: 1, // Keep border thickness
  color: "#FFFFFF", // Border color remains white when highlighted
  fillColor: "#F5E2C8", // Set fill color to yellow when highlighted
  fillOpacity: 1,
};

const PakistanMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState({
    name: "Select a province",
    population: "Population data",
  });

  useEffect(() => {
    fetch("/geoBoundaries-PAK-ADM1_simplified.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) =>
        console.error("Error loading the geoJSON data: ", error)
      );
  }, []);

  const onEachProvince = (province, layer) => {
    layer.on({
      mouseover: (event) => {
        setSelectedProvince({
          name: province.properties.name,
          population: "Population data",
        }); // Update this line as needed
        event.target.setStyle(highlightStyle);
      },
      mouseout: (event) => {
        setSelectedProvince({
          name: "Select a province",
          population: "Population data",
        });
        event.target.setStyle(defaultStyle);
      },
      click: (event) => {
        // Implement any click event you'd like here
        alert(`Clicked on province: ${province.properties.name}`);
      },
    });
  };

  if (!geoJsonData) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
      >
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachProvince}
          style={() => defaultStyle}
        />
      </MapContainer>
      <Card style={{ width: "300px", margin: "20px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {selectedProvince.name}
          </Typography>
          <Typography variant="body2">
            Population: {selectedProvince.population}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PakistanMap;
