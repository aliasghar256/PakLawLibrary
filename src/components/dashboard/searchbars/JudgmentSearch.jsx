import { useState } from "react";
import "./SearchStyles.css";

export default function JudgmentSearch() {
  const [data, setData] = useState({
    query: "",
    court: "",
  });

  const handleForm = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const courts = [
    "All Courts",
    "Sindh High Court",
    "Punjab High Court",
    "Islamabad Supreme Court",
  ];

  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Search..."
        name="query"
        value={data.query}
        onChange={handleForm}
        className="search-input"
      />
      <select
        id="court"
        name="court"
        value={data.court}
        onChange={handleForm}
        className="search-select"
      >
        {courts.map((court) => (
          <option key={court} value={court}>
            {court}
          </option>
        ))}
      </select>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
