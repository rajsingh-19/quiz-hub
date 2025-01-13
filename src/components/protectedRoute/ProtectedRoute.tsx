import React, {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/userContext"; // Import the useAuth hook

interface ProtectedRouteProps {
    children: ReactNode; // The children to render if the user is authenticated
};

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the user is logged in by verifying if a token exists in localStorage
  const { token } = useAuth() // Use the token from AuthContext

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected children (i.e., the component)
  return <>{children}</>;
};

export default ProtectedRoute;
