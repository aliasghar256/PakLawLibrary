import "./JudgmentResult.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../UserContext";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const JudgmentResult = ({
  judgment,
  query,
  showHighlight,
  showAddBookmark,
  showDeleteBookmark,
  onButtonClick,
}) => {
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
      if (response.status === 200) {
        console.log(response);
        Toastify({
          text: "Bookmark Deleted Successfully",

          duration: 2000,

          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      }
      onButtonClick();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      Toastify({
        text: "Error Deleting Bookmark",

        duration: 2000,

        style: {
          background: "linear-gradient(to right, #c30010, #f94449)",
        },
      }).showToast();
    }
  };

  const addBookmark = async () => {
    try {
      const url = `http://127.0.0.1:3001/favorites/add`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            judgmentid: judgment.JudgmentID, // Ensure this matches the key in the backend
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        Toastify({
          text: "Bookmark Added",

          duration: 2000,

          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      Toastify({
        text: "Error Adding Bookmark",

        duration: 2000,

        style: {
          background: "linear-gradient(to right, #c30010, #f94449)",
        },
      }).showToast();
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
        {showAddBookmark && (
          <Button variant="outlined" onClick={addBookmark}>
            Bookmark
          </Button>
        )}
        {showDeleteBookmark && (
          <Button variant="outlined" onClick={deleteBookmark}>
            Delete Bookmark
          </Button>
        )}
      </div>
    </div>
  );
};

export default JudgmentResult;
