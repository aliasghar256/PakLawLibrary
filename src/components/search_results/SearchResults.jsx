//SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../SearchBar";
import JudgmentResult from "./JudgmentResult";
import "./SearchResults.css";
import ReactLoading from "react-loading";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [judgmentData, setJudgmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfJudgments, setNumberOfJudgments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:3001/judgment/searchValue?query=${query}`;
        const response = await axios.get(url);
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
      <div className="search-bar">
        <SearchBar setIsLoading={setIsLoading} />
      </div>
      <h1 className="search-results-heading">Search Results</h1>
      {isLoading ? (
        <ReactLoading
          type={"cylon"}
          color={"#04b4e0"}
          height={"20%"}
          width={"20%"}
        />
      ) : (
        <>
          <p>
            Displaying {numberOfJudgments} results for: {query}
          </p>
          {judgmentData &&
            judgmentData.map((judgment) => (
              <JudgmentResult
                key={judgment.JudgmentID}
                judgment={judgment}
                query={query}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default SearchResults;
