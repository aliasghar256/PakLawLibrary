// JudgmentResult.jsx
import React from "react";
import "./JudgmentResult.css";
import { useNavigate } from "react-router-dom";

const JudgmentResult = ({ judgment, query, showHighlight }) => {
  // Function to highlight the search query in the snippet
  const highlightQuery = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };
  const navigate = useNavigate();
  const handleViewJudgmentClick = () => {
    navigate(`/viewjudgment/${judgment.JudgmentID}`);
  };

  return (
    <div className="judgment-card">
      <div className="judgment-header">
        <h2>
          {judgment.Party1} v {judgment.Party2}
        </h2>
        <h3>{judgment.CaseYear}</h3>
      </div>
      <div className="judgment-body">
        {showHighlight && (
          <p>
            <strong>Snippet:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: highlightQuery(judgment.snippet, query),
              }}
            ></span>
          </p>
        )}
      </div>
      <div className="judgment-footer">
        <p>
          <strong>Case No:</strong> {judgment.CaseNo}
        </p>

        <button className="view-judgment-btn" onClick={handleViewJudgmentClick}>
          View Judgment
        </button>
      </div>
    </div>
  );
};

export default JudgmentResult;
