// export default function SearchOptions({ setSearchBarIndex }) {
//   return (
//     <div>
//       <div>
//         <button onClick={() => setSearchBarIndex(0)}>Keyword Search</button>
//       </div>
//       <div>
//         <button onClick={() => setSearchBarIndex(1)}>Advanced Search</button>
//       </div>
//     </div>
//   );
// }

import "./SearchOptions.css";

import { AppBar, Box, Tabs, Tab, Button } from "@mui/material";

export default function SearchOptions({ setSearchBarIndex }) {
  const handleTabChange = (event, newValue) => {
    // Handle tab change logic (optional)
  };

  return (
    <AppBar position="static">
      <Tabs value={0} orientation="vertical" onChange={(event, newValue) => setSearchBarIndex(newValue)}>
        <Tab component={Button} onClick={() => setSearchBarIndex(0)} label="Keyword Search" />
        <Tab component={Button} onClick={() => setSearchBarIndex(1)} label="Advanced Search" />
      </Tabs>
    </AppBar>
  );
}
