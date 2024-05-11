import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import styled from "styled-components";

const geoUrl =
  process.env.PUBLIC_URL + "/geoBoundaries-PAK-ADM1_simplified.geojson";

const StyledGeography = styled(Geography)`
  default: {
    fill: "#D6D6DA", // Default fill color for regions
    stroke: "#FFFFFF", // White stroke for better contrast
    outline: "none"
  }
  &:hover {
    fill: "#f00"; // Red fill on hover
    cursor: "pointer"; // Pointer cursor on hover
  }
`;

const PakistanMap = ({ setTooltipContent }) => {
  return (
    <ComposableMap
      projectionConfig={{ scale: 1200 }} // Adjust scale as needed for better fit
      width={800} // Width of the map
      height={600} // Height of the map
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error loading map data.</div>;

          return geographies.map((geo) => (
            <StyledGeography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                const { shapeName } = geo.properties; // Use the correct property for tooltip
                setTooltipContent(`${shapeName}: Number of Judgments`);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
            />
          ));
        }}
      </Geographies>
    </ComposableMap>
  );
};

export default PakistanMap;
