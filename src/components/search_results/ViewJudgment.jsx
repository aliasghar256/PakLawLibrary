import React, { useState, useEffect, useContext } from "react";
import Accordion from "./accordion/Accordion";
import "./ViewJudgment.css"; // Your stylesheet
import axios from "axios";
import { useParams } from "react-router-dom";
import { miyagi } from "ldrs";
import NoteTakingDialog from "./NoteTakingDialog";
import { Button } from "@mui/material";
import UserContext from "../../UserContext";

miyagi.register();

function ViewJudgment() {
  const { JudgmentID } = useParams();
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:3001/judgment/searchbyid?JudgmentID=${JudgmentID}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        setJudgmentData(response.data.judgment);
        // console.log("Response from viewJUdgment:", response);
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
      <l-miyagi size="65" stroke="3.5" speed="0.5" color="#04b4e0"></l-miyagi>
    );
  }

  if (!judgmentData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="judgment-container">
        <div className="logo-container">
          <img src="/prussianbluelogo.svg" alt="Logo" className="logo" />
        </div>
        <div className="case-meta-container">
          <div className="case-meta">
            <div>Case Year: {judgmentData.CaseYear}</div>
            <div>
              Judgment Date:{" "}
              {new Date(judgmentData.CaseDate).toLocaleDateString()}
            </div>
            <div>Bench: {judgmentData.Bench}</div>
            <div>AFR: {judgmentData.AFR}</div>
          </div>
        </div>
        <div className="case-number">{judgmentData.CaseNo}</div>
        <div className="content-section">
          <div className="decided-by">
            Decided by:
            <div className="judge-name">{judgmentData.JudgeID}</div>
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
      </div>
      <Button
        variant="contained"
        color="primary"
        className="note-button"
        onClick={() => setIsNoteDialogOpen(true)}
      >
        Take Notes
      </Button>
      {isNoteDialogOpen && (
        <NoteTakingDialog
          open={isNoteDialogOpen}
          onClose={() => setIsNoteDialogOpen(false)}
          judgmentID={judgmentData.JudgmentID}
        />
      )}
    </>
  );
}

export default ViewJudgment;
