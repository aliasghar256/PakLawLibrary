import { useState } from "react";
import "./SearchStyles.css";

export default function JudgmentSearch({ setQuery, token }) {
  const [data, setData] = useState({
    keyword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery({
      headers: {
        Authorization: `Bearer ${token}`,
        keyword: data.keyword,
        court: data.court,
      },
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        name="keyword"
        value={data.keyword}
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
