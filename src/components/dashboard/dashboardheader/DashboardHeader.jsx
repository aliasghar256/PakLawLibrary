// export default function DashboardHeader() {
//   return (
//     <>
//       <header>
//         <nav>
//           <ul>
//             <li>
//               <a href="/dashboard">dashboard</a>
//             </li>
//             <li>
//               <a href="/bookmarks">bookmarks</a>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// }

import "./DashboardHeader.css";

import { AppBar, Tabs, Tab, Link } from "@mui/material";

export default function DashboardHeader() {
  const handleTabChange = (event, newValue) => {
    // Handle tab change logic (optional)
  };

  return (
    <AppBar position="static">
      <Tabs value={0} onChange={handleTabChange}>
        <Tab component={Link} href="/dashboard" label="Dashboard" />
        <Tab component={Link} href="/bookmarks" label="Bookmarks" />
      </Tabs>
    </AppBar>
  );
}



