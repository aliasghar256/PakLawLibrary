import SearchResults from "../search_results/SearchResults";
import { useState } from "react";
import DashboardHeader from "./dashboardheader/DashboardHeader";
import JudgmentSearch from "./searchbars/JudgmentSearch";
import SearchOptions from "./sidebar/SearchOptions";
import AdvancedSearch from "./searchbars/AdvancedSearch";

export default function Dashboard({ userData, setUserData }) {
  const [searchBarIndex, setSearchBarIndex] = useState(0);
  console.log(userData);
  return (
    <>
      <DashboardHeader />
      <SearchOptions setSearchBarIndex={setSearchBarIndex} />
      {/* <h1>Dashboard</h1> */}
      {searchBarIndex === 0 && <JudgmentSearch />}
      {searchBarIndex === 1 && <AdvancedSearch />}
      <SearchResults searchBarIndex={searchBarIndex} />
    </>
  );
}
