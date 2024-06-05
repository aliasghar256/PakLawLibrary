import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import UserContext from "../../UserContext";

export default function NoteTakingDialog({ open, onClose, judgmentID }) {
  const [newNote, setNewNote] = useState("");
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        let url = "http://127.0.0.1:3001/usernote/view";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            judgmentid: judgmentID,
          },
        });
        if (response.status === 200) {
          setNewNote(response.data.note.note);
          Toastify({
            text: "Note Found Successful",

            duration: 2000,

            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        }
      } catch (error) {
        console.error("No previous Notes:", error);
        Toastify({
          text: error,

          duration: 2000,

          style: {
            background: "linear-gradient(to right, #c30010, #f94449)",
          },
        }).showToast();
      }
    };

    if (open) {
      fetchNote();
    }
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/usernote/add",
          { note: newNote },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
              judgmentid: judgmentID,
            },
          }
        );
        // console.log("Note saved:", response.data);
        if (response.status === 200) {
          Toastify({
            text: "Note Saved Successful",

            duration: 2000,

            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        }

      } catch (error) {
        console.error("Error saving note:", error);
        Toastify({
          text: error,

          duration: 2000,

          style: {
            background: "linear-gradient(to right, #c30010, #f94449)",
          },
        }).showToast();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Note Taking</DialogTitle>
      <DialogContent>
        <TextField
          label="New Note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddNote} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="primary">
          Close Window
        </Button>
      </DialogActions>
    </Dialog>
  );
}
