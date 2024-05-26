import React from "react";
import Login from "./Login";
import { useState } from "react";
import SignUp from "./SignUp";
export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <SignUp setShowLogin={setShowLogin} />
      )}
    </div>
  );
}
