import React, { createContext, useContext, useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      JoblyApi.setToken(token);
      fetchUserData();
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const userData = await JoblyApi.getUserDetails(user.username);
      setUser(userData);
    } catch (error) {
      console.error("Error loading the user data:", error);
      setUser(null);
    }
  };

  const updateUserDetails = async (updateData) => {
    try {
      const updatedUser = await JoblyApi.updateUserProfile(user.username, updateData);
      if (updatedUser.token) {
        localStorage.setItem('token', updatedUser.token);
        setToken(updatedUser.token);
      }
      setUser(updatedUser);
      console.log(updatedUser)
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
