import React, { useState, useEffect } from "react";
import Accordion from "./accordion/Accordion";
import "./ViewJudgment.css"; // Your stylesheet
import axios from "axios";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

function ViewJudgment() {
  const { JudgmentID } = useParams();
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:3001/judgment/searchbyid?JudgmentID=${JudgmentID}`;
        const response = await axios.get(url);
        setJudgmentData(response.data.judgment);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (JudgmentID) {
      fetchData();
    }
  }, [JudgmentID]);

  if (isLoading) {
    return (
      <ReactLoading
        type={"balls"}
        color={"#04b4e0"}
        height={"20%"}
        width={"20%"}
      />
    );
  }

  return (
    <div className="judgment-container">
      <div className="header-section">
        <img src="/prussianbluelogo.svg" alt="Logo" className="logo" />
        <div className="case-meta">
          <div>{judgmentData.CaseYear}</div>
          <div>{new Date(judgmentData.CaseDate).toLocaleDateString()}</div>
          <div>{judgmentData.Bench}</div>
          {/* Additional metadata elements here if needed */}
        </div>
      </div>

      <div className="content-section">
        <div className="decided-by">
          Decided by:
          <div className="judge-name">
            TRIBUNAL JUDGE {judgmentData.JudgeID}
          </div>
        </div>

        <div className="parties-section">
          <div className="party">Between</div>
          <div className="party-name">{judgmentData.Party1}</div>
          <div className="party">and</div>
          <div className="party-name">{judgmentData.Party2}</div>
        </div>

        <Accordion
          title="Judgment Text"
          content={judgmentData.JudgmentText}
          previewLength={300}
        />
      </div>

      <a href={`/path-to-case/${judgmentData.CaseNo}`} className="case-link">
        Read More
      </a>
    </div>
  );
}

export default ViewJudgment;
