// UserContext.js

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(null);

  const setUser = (status) => {
    setUserStatus(status);
  };

  return (
    <UserContext.Provider value={{ userStatus, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
