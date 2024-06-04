import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserContext);

  if (!userData.loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
