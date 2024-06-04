import SearchResults from "../search_results/SearchResults";
import { useState } from "react";
import DashboardHeader from "./dashboardheader/DashboardHeader";
import JudgmentSearch from "./searchbars/JudgmentSearch";
import SearchOptions from "./sidebar/SearchOptions";
import AdvancedSearch from "./searchbars/AdvancedSearch";

export default function Dashboard({ userData, setUserData }) {
  const [searchBarIndex, setSearchBarIndex] = useState(0);
  const [query, setQuery] = useState({});
  console.log("User Data from Dash: ", userData);
  console.log("Query from Dash: ", query);
  return (
    <>
      <DashboardHeader />
      <h1>Dashboard</h1>
      {searchBarIndex === 0 && (
        <JudgmentSearch token={userData.token} setQuery={setQuery} />
      )}
      {searchBarIndex === 1 && (
        <AdvancedSearch token={userData.token} setQuery={setQuery} />
      )}
      <SearchOptions setSearchBarIndex={setSearchBarIndex} query={query} />
      <SearchResults searchBarIndex={searchBarIndex} />
    </>
  );
}
