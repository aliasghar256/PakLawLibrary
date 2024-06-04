import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/bookmarks">Bookmarks</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
