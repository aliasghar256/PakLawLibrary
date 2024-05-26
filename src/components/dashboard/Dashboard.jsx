import SearchResults from "../search_results/SearchResults";
import { useState } from "react";
import DashboardHeader from "./dashboardheader/DashboardHeader";
import JudgmentSearch from "./searchbars/JudgmentSearch";
import SearchOptions from "./sidebar/SearchOptions";
import AdvancedSearch from "./searchbars/AdvancedSearch";

export default function Dashboard() {
  const [searchBarIndex, setSearchBarIndex] = useState([false, true]);
  return (
    <>
      <DashboardHeader />
      <h1>Dashboard</h1>
      {searchBarIndex[0] && <JudgmentSearch />}
      {searchBarIndex[1] && <AdvancedSearch />}
      <SearchOptions setSearchBarIndex={setSearchBarIndex} />
      <SearchResults />
    </>
  );
}