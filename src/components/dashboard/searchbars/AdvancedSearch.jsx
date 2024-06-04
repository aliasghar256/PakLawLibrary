import { useState } from "react";
import "./AdvancedSearch.css";

export default function JudgmentSearch({ setQuery, token }) {
  const [data, setData] = useState({
    keyword: "",
    courtName: "",
    judgeName: "",
    lawyerName: "",
    appellantOpponent: "",
    section: "",
    actOrdinance: "",
    rule: "",
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
        court: data.courtName,
        judgeName: data.judgeName,
        lawyerName: data.lawyerName,
        appellantOpponent: data.appellantOpponent,
        section: data.section,
        actOrdinance: data.actOrdinance,
        rule: data.rule,
      },
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Keyword(s)..."
        name="keyword"
        value={data.keyword}
        onChange={handleForm}
        className="search-input"
      />
      <select
        id="courtName"
        name="courtName"
        value={data.courtName}
        onChange={handleForm}
        className="search-select"
      >
        {courts.map((court) => (
          <option key={court} value={court}>
            {court}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Judge Name"
        name="judgeName"
        value={data.judgeName}
        onChange={handleForm}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Lawyer Name"
        name="lawyerName"
        value={data.lawyerName}
        onChange={handleForm}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Appellant/Opponent"
        name="appellantOpponent"
        value={data.appellantOpponent}
        onChange={handleForm}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Section"
        name="section"
        value={data.section}
        onChange={handleForm}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Act/Ordinance"
        name="actOrdinance"
        value={data.actOrdinance}
        onChange={handleForm}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Rule"
        name="rule"
        value={data.rule}
        onChange={handleForm}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
