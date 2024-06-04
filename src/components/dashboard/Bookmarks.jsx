//SearchResults.jsx
import DashboardHeader from "./dashboardheader/DashboardHeader";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import JudgmentResult from "../search_results/JudgmentResult";

import "../search_results/SearchResults.css";
import { miyagi } from "ldrs";

miyagi.register();

// Default values shown

function Bookmarks({ searchBarIndex }) {
  const [showHighlight, setShowHighlight] = useState(false);
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfJudgments, setNumberOfJudgments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url = `http://127.0.0.1:3001/favorites/view`;
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOiI2NWNmNWYxNWU5OTE3MTE3OWEwNTlkMTYiLCJpYXQiOjE3MTc0Nzg1OTcsImV4cCI6MTcxNzU2NDk5N30.jhk8dqGmcc0nRy8VusnoCPwDX-DmodAkUYeQ1Q44oN8",
          },
        });
        setJudgmentData(response.data.favorites);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
    <DashboardHeader />
    <div className="bookmarks">
      <h1 className="search-results-heading">Bookmarks</h1>
      {isLoading ? (
        <l-miyagi size="65" stroke="3.5" speed="0.5" color="#04b4e0"></l-miyagi>
      ) : (
        <>
          <p>Displaying {numberOfJudgments} results:</p>
          {judgmentData &&
            judgmentData.map((judgment) => (
              <JudgmentResult
                key={judgment.JudgmentID}
                judgment={judgment.judgment_ID}
                showHighlight={showHighlight}
              />
            ))}
        </>
      )}
    </div>
    </>
  );
}

export default Bookmarks;
