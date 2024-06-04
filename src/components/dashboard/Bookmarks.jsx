//SearchResults.jsx
import DashboardHeader from "./dashboardheader/DashboardHeader";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import JudgmentResult from "../search_results/JudgmentResult";
import "../search_results/SearchResults.css";
import { miyagi } from "ldrs";

import UserContext from "../../UserContext";

miyagi.register();

// Default values shown

function Bookmarks({ searchBarIndex }) {
  const [showHighlight, setShowHighlight] = useState(false);
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfJudgments, setNumberOfJudgments] = useState(0);
  const { userData } = useContext(UserContext);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonPressed = () => {
    setButtonPressed((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url = `http://127.0.0.1:3001/favorites/view`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
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
  }, [buttonPressed]);

  return (
    <>
      <DashboardHeader />
      <div className="bookmarks">
        <h1 className="search-results-heading">Bookmarks</h1>
        {isLoading ? (
          <l-miyagi
            size="65"
            stroke="3.5"
            speed="0.5"
            color="#04b4e0"
          ></l-miyagi>
        ) : (
          <>
            <p>Displaying {numberOfJudgments} results:</p>
            {judgmentData &&
              judgmentData.map((judgment) => (
                <JudgmentResult
                  key={judgment.JudgmentID}
                  judgment={judgment.judgment_ID}
                  showHighlight={showHighlight}
                  showAddBookmark={false}
                  showDeleteBookmark={true}
                  onButtonClick={handleButtonPressed}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default Bookmarks;
