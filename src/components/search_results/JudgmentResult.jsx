// JudgmentResult.jsx
// import React from "react";
// import "./JudgmentResult.css";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

// const JudgmentResult = ({ judgment, query, showHighlight }) => {
//   // Function to highlight the search query in the snippet
//   const highlightQuery = (text, query) => {
//     const regex = new RegExp(`(${query})`, "gi");
//     return text.replace(regex, "<mark>$1</mark>");
//   };
//   const navigate = useNavigate();
//   const handleViewJudgmentClick = () => {
//     navigate(`/viewjudgment/${judgment.JudgmentID}`);
//   };

//   const deleteBookmark = () => {

//   };

//   return (
//     <div className="judgment-card">
//       <div className="judgment-header">
//         <h2>
//           {judgment.Party1} v {judgment.Party2}
//         </h2>
//         <h3>{judgment.CaseYear}</h3>
//       </div>
//       <div className="judgment-body">
//         {showHighlight && (
//           <p>
//             <strong>Snippet:</strong>{" "}
//             <span
//               dangerouslySetInnerHTML={{
//                 __html: highlightQuery(judgment.snippet, query),
//               }}
//             ></span>
//           </p>
//         )}
//       </div>
//       <div className="judgment-footer">
//         <p>
//           <strong>Case No:</strong> {judgment.CaseNo}
//         </p>

//         <button className="view-judgment-btn" onClick={handleViewJudgmentClick}>
//           View Judgment
//         </button>
//         <Button variant="outlined">Bookmark</Button>
//         <Button variant="outlined" onClick={deleteBookmark}>Delete Bookmark</Button>
//       </div>
//     </div>
//   );
// };

// export default JudgmentResult;


import React from "react";
import "./JudgmentResult.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const JudgmentResult = ({ judgment, query, showHighlight, onDelete }) => {
  // Function to highlight the search query in the snippet
  const highlightQuery = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const navigate = useNavigate();
  const handleViewJudgmentClick = () => {
    navigate(`/viewjudgment/${judgment.JudgmentID}`);
  };

  const deleteBookmark = async () => {
    try {
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOiI2NWNmNWYxNWU5OTE3MTE3OWEwNTlkMTYiLCJpYXQiOjE3MTc0Nzg1OTcsImV4cCI6MTcxNzU2NDk5N30.jhk8dqGmcc0nRy8VusnoCPwDX-DmodAkUYeQ1Q44oN8";

      await axios.delete(
        "http://127.0.0.1:3001/favorites/delete",
        { JudgmentID: judgment.JudgmentID },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (onDelete) {
        onDelete(judgment.JudgmentID);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div className="judgment-card">
      <div className="judgment-header">
        <h2>
          {judgment.Party1} v {judgment.Party2}
        </h2>
        <h3>{judgment.CaseYear}</h3>
      </div>
      <div className="judgment-body">
        {showHighlight && (
          <p>
            <strong>Snippet:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: highlightQuery(judgment.snippet, query),
              }}
            ></span>
          </p>
        )}
      </div>
      <div className="judgment-footer">
        <p>
          <strong>Case No:</strong> {judgment.CaseNo}
        </p>

        <button className="view-judgment-btn" onClick={handleViewJudgmentClick}>
          View Judgment
        </button>
        <Button variant="outlined">Bookmark</Button>
        <Button variant="outlined" onClick={deleteBookmark}>
          Delete Bookmark
        </Button>
      </div>
    </div>
  );
};

export default JudgmentResult;