import React, { useState } from "react";
import "./Accordion.css"; // Make sure to create a corresponding Accordion.css file

const Accordion = ({ title, content, previewLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Use this function to truncate the text for preview
  const renderPreview = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="accordion">
      <div className="accordion-title" onClick={toggleExpanded}>
        <h2>{title}</h2>
      </div>
      <div className={`accordion-content ${isExpanded ? "expanded" : ""}`}>
        {isExpanded ? (
          <div className="full-content">{content}</div>
        ) : (
          <div className="preview-content">
            {renderPreview(content, previewLength)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
