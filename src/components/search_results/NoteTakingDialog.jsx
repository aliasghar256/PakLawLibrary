import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function NoteTakingDialog({ open, onClose, judgmentID }) {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = async () => {
    if (newNote.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/usernote/add",
          { note: newNote },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOiI2NWNmNWYxNWU5OTE3MTE3OWEwNTlkMTYiLCJpYXQiOjE3MTc0Nzg1OTcsImV4cCI6MTcxNzU2NDk5N30.jhk8dqGmcc0nRy8VusnoCPwDX-DmodAkUYeQ1Q44oN8",
              judgmentid: judgmentID,
            },
          }
        );
        console.log("Note saved:", response.data);
        setNewNote("");
        onClose();
      } catch (error) {
        console.error("Error saving note:", error);
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
