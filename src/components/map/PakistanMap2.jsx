import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

const defaultStyle = {
  fillColor: "blue",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.5,
};

const highlightStyle = {
  weight: 5,
  color: "#666",
  dashArray: "",
  fillOpacity: 0.7,
};

const PakistanMap2 = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Asynchronously fetch the GeoJSON data from the public folder
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
        event.target.setStyle(highlightStyle);
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          event.target.bringToFront();
        }
      },
      mouseout: (event) => {
        event.target.setStyle(defaultStyle);
      },
      click: (event) => {
        alert(`Clicked on province: ${province.properties.name}`);
      },
    });
  };

  if (!geoJsonData) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <GeoJSON
        data={geoJsonData}
        onEachFeature={onEachProvince}
        style={() => defaultStyle}
      />
    </MapContainer>
  );
};

export default PakistanMap2;
