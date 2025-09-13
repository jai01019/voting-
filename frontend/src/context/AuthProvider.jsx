//context//AuthProvider.jsx
import React, { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext"; // ✅ import context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem(import.meta.env.VITE_JWT_TOKEN_KEY)
  );

  // ✅ useCallback for logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(import.meta.env.VITE_JWT_TOKEN_KEY);
  }, []);

  // ✅ useCallback for fetchUserProfile
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get("/user/profile");
      setUser(response.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token, fetchUserProfile]);

  const login = async (aadharCardNumber, password) => {
    try {
      const response = await api.post("/user/login", {
        aadharCardNumber,
        password,
      });
      const { token: newToken, response: userResponse } = response.data;

      setToken(newToken);
      localStorage.setItem(import.meta.env.VITE_JWT_TOKEN_KEY, newToken);
      setUser(userResponse);

      return { success: true, data: userResponse };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post("/user/signup", userData);
      const { token: newToken, response: userResponse } = response.data;

      setToken(newToken);
      localStorage.setItem(import.meta.env.VITE_JWT_TOKEN_KEY, newToken);
      setUser(userResponse);

      return { success: true, data: userResponse };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Signup failed",
      };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await api.put("/user/profile/password", { currentPassword, newPassword });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Password update failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updatePassword,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isVoter: user?.role === "voter",
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
