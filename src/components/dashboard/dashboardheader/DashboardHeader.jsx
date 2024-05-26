import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>
              <a href="/bookmarks">bookmarks</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
