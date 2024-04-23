import React, { useState, useEffect } from "react";
import Accordion from "./accordion/Accordion";
import "./ViewJudgment.css"; // Your stylesheet
import axios from "axios";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

function ViewJudgment() {
  const { JudgmentID } = useParams(); // Using useParams to get the JudgmentID from the URL
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

  return isLoading ? (
    <ReactLoading
      type={"balls"}
      color={"#04b4e0"}
      height={"20%"}
      width={"20%"}
    />
  ) : (
    <div className="judgment-container">
      <h1>Case Judgment</h1>
      <h2>{judgmentData.CaseNo}</h2>
      <div className="judgment-details">
        <p>
          <strong>Parties:</strong> {judgmentData.Party1} vs{" "}
          {judgmentData.Party2}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(judgmentData.CaseDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Case Year:</strong> {judgmentData.CaseYear}
        </p>
      </div>
      <Accordion
        title="Judgment Text"
        content={judgmentData.JudgmentText}
        previewLength={300}
      />
      <div className="judgment-metadata">
        <p>
          <strong>Bench:</strong> {judgmentData.Bench}
        </p>
      </div>
      <a href={`/path-to-case/${judgmentData.CaseNo}`} className="case-link">
        Read More
      </a>
    </div>
  );
}

export default ViewJudgment;
