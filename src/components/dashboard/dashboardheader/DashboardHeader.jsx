import { Link } from "react-router-dom";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
