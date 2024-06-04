//SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import JudgmentResult from "./JudgmentResult";
import "./SearchResults.css";
import { miyagi } from "ldrs";

miyagi.register();

// Default values shown

function SearchResults({ searchBarIndex, query }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfJudgments, setNumberOfJudgments] = useState(0);
  const [showHighlight, setShowHighlight] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url = `http://127.0.0.1:3001/judgment/keyword_search`;
        if (searchBarIndex === 1) {
          url = `http://127.0.0.1:3001/judgment/advanced_search?keyword=${keyword}`;
        }
        const response = await axios.get(url, query);
        setJudgmentData(response.data.results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
      if (judgmentData != null || judgmentData != undefined)
        setNumberOfJudgments(judgmentData.length);
    }
  }, [query]);
  return (
    <div className="search-results">
      <h1 className="search-results-heading">Search Results</h1>
      {isLoading ? (
        <l-miyagi size="65" stroke="3.5" speed="0.5" color="#04b4e0"></l-miyagi>
      ) : (
        <>
          <p>
            Displaying {numberOfJudgments} results for: {keyword}
          </p>
          {judgmentData &&
            judgmentData.map((judgment) => (
              <JudgmentResult
                key={judgment.JudgmentID}
                judgment={judgment}
                query={keyword}
                showHighlight={showHighlight}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default SearchResults;
