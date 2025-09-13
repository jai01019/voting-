import { useState, useEffect, useCallback } from "react";
import { api, authAPI } from "../services/api";
import { STORAGE_KEYS, USER_ROLES, ERROR_MESSAGES } from "../utils/constants";

// Custom hook for authentication management
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.JWT_TOKEN)
  );

  // Check if user is authenticated
  const isAuthenticated = Boolean(token && user);

  // Check user roles
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isVoter = user?.role === USER_ROLES.VOTER;

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initialize authentication state
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Login function
  const login = async (aadharCardNumber, password) => {
    try {
      setLoading(true);

      const response = await authAPI.login({
        aadharCardNumber: parseInt(aadharCardNumber),
        password,
      });

      const { token: newToken } = response.data;

      // Store token
      setToken(newToken);
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, newToken);

      // Fetch user profile
      await fetchUserProfile();

      return { success: true, message: "Login successful!" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || ERROR_MESSAGES.INVALID_CREDENTIALS;
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);

      const response = await authAPI.signup(userData);
      const { token: newToken } = response.data;

      // Store token
      setToken(newToken);
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, newToken);

      // Fetch user profile
      await fetchUserProfile();

      return { success: true, message: "Account created successfully!" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || ERROR_MESSAGES.VALIDATION_ERROR;
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);

    // Clear any other user-related data from localStorage
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  }, []);

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await authAPI.updatePassword({
        currentPassword,
        newPassword,
      });

      return { success: true, message: "Password updated successfully!" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: errorMessage };
    }
  };

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (token) {
      await fetchUserProfile();
    }
  }, [fetchUserProfile, token]);

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;

      switch (permission) {
        case "admin":
          return user.role === USER_ROLES.ADMIN;
        case "vote":
          return user.role === USER_ROLES.VOTER && !user.isVoted;
        case "view_results":
          return user.role === USER_ROLES.ADMIN;
        case "manage_users":
          return user.role === USER_ROLES.ADMIN;
        case "manage_candidates":
          return user.role === USER_ROLES.ADMIN;
        default:
          return false;
      }
    },
    [user]
  );

  // Get user display name
  const getUserDisplayName = useCallback(() => {
    if (!user) return "";
    return user.name || "User";
  }, [user]);

  // Get user initials for avatar
  const getUserInitials = useCallback(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }, [user]);

  // Check if user data is complete
  const isProfileComplete = useCallback(() => {
    if (!user) return false;

    const requiredFields = ["name", "age", "address", "aadharCardNumber"];
    return requiredFields.every((field) => user[field]);
  }, [user]);

  // Auto-logout on token expiration
  useEffect(() => {
    const handleTokenExpiration = (event) => {
      if (event.key === STORAGE_KEYS.JWT_TOKEN && !event.newValue) {
        logout();
      }
    };

    window.addEventListener("storage", handleTokenExpiration);

    return () => {
      window.removeEventListener("storage", handleTokenExpiration);
    };
  }, [logout]);

  // Return authentication state and methods
  return {
    // State
    user,
    loading,
    token,
    isAuthenticated,
    isAdmin,
    isVoter,

    // Methods
    login,
    signup,
    logout,
    updatePassword,
    refreshProfile,
    hasPermission,
    getUserDisplayName,
    getUserInitials,
    isProfileComplete,

    // Computed values
    canVote: user?.role === USER_ROLES.VOTER && !user?.isVoted,
    hasVoted: user?.isVoted || false,
    userRole: user?.role || null,
  };
};

// Hook for checking authentication status
export const useAuthStatus = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);

    if (token) {
      // Verify token validity
      api
        .get("/user/profile")
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsChecking(false);
        });
    } else {
      setIsChecking(false);
      setIsAuthenticated(false);
    }
  }, []);

  return { isChecking, isAuthenticated };
};

// Hook for role-based access control
export const useRoleAccess = (requiredRoles = []) => {
  const { user, loading } = useAuth();

  const hasAccess = user && requiredRoles.includes(user.role);

  return {
    hasAccess,
    loading,
    user,
    userRole: user?.role,
  };
};

export default useAuth;
