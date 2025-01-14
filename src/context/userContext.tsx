import React, { createContext, useContext, useState } from 'react';

//    Defining the token and userID type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

//  Creating a context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//  Creating a provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

  // Function to update the token and sync with localStorage
  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Function to update the userId and sync with localStorage
  const updateUserId = (newUserId: string | null) => {
    setUserId(newUserId);
    if (newUserId) {
      localStorage.setItem('userId', newUserId);
    } else {
      localStorage.removeItem('userId');
    }
  };
    
  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, userId, setUserId: updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
