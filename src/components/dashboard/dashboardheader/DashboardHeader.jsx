import { Link } from "react-router-dom";
import "./DashboardHeader.css";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../../../UserContext";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const { logout } = useContext(UserContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(userData.token);
    navigate("/");
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
            <li class="float-right">
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
