import SearchResults from "../search_results/SearchResults";
import { useState } from "react";
import DashboardHeader from "./dashboardheader/DashboardHeader";
import JudgmentSearch from "./searchbars/JudgmentSearch";
import SearchOptions from "./sidebar/SearchOptions";
import AdvancedSearch from "./searchbars/AdvancedSearch";
import React, { useContext } from "react";
import UserContext from "../../UserContext";

export default function Dashboard() {
  const [searchBarIndex, setSearchBarIndex] = useState(0);
  const [query, setQuery] = useState("");
  const { userData } = useContext(UserContext);
  console.log(userData.token);
  return (
    <>
      <DashboardHeader />
      <SearchOptions setSearchBarIndex={setSearchBarIndex} query={query} />
      {searchBarIndex === 0 && (
        <JudgmentSearch token={userData.token} setQuery={setQuery} />
      )}
      {searchBarIndex === 1 && (
        <AdvancedSearch token={userData.token} setQuery={setQuery} />
      )}
      <SearchResults searchBarIndex={searchBarIndex} query={query} />
    </>
  );
}
