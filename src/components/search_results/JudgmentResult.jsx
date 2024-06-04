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

import "./JudgmentResult.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../UserContext";

const JudgmentResult = ({ judgment, query, showHighlight, onDelete }) => {
  const { userData } = useContext(UserContext);

  // Function to highlight the search query in the snippet
  const highlightQuery = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const navigate = useNavigate();
  const handleViewJudgmentClick = () => {
    navigate(`/viewjudgment/${judgment.JudgmentID}`);
  };

  const deleteBookmark = async (e) => {
    try {
      const url = `http://127.0.0.1:3001/favorites/delete`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          JudgmentID: judgment.JudgmentID,
        },
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const addBookmark = async (e) => {
    try {
      const url = `http://127.0.0.1:3001/favorites/add`;
      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          JudgmentID: judgment.JudgmentID,
        },
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error("Error Adding bookmark:", error);
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
        <Button variant="outlined" onClick={addBookmark}>
          Bookmark
        </Button>
        <Button variant="outlined" onClick={deleteBookmark}>
          Delete Bookmark
        </Button>
      </div>
    </div>
  );
};

export default JudgmentResult;
