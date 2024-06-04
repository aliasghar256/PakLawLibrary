import React from "react";
import Login from "./Login";
import { useState } from "react";
import SignUp from "./SignUp";
export default function Auth({ setShowAuth, setUserData }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          setShowAuth={setShowAuth}
          setUserData={setUserData}
        />
      ) : (
        <SignUp setShowLogin={setShowLogin} setShowAuth={setShowAuth} />
      )}
    </div>
  );
}
