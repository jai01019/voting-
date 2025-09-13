// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/user/login",
    SIGNUP: "/user/signup",
    PROFILE: "/user/profile",
    UPDATE_PASSWORD: "/user/profile/password",

    // User management endpoints
    GET_ALL_USERS: "/user",
    UPDATE_VOTE_STATUS: "/user/vote-status",

    // Candidate endpoints
    GET_CANDIDATES: "/candidate",
    CREATE_CANDIDATE: "/candidate",
    DELETE_CANDIDATE: "/candidate",
    VOTE_CANDIDATE: "/candidate/vote",
    GET_RESULTS: "/candidate/results",
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  JWT_TOKEN: import.meta.env.VITE_JWT_TOKEN_KEY || "voting_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme_preference",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  VOTER: "voter",
};

// Application Routes
export const ROUTES = {
  // Public routes
  LOGIN: "/login",
  SIGNUP: "/signup",

  // User routes
  DASHBOARD: "/dashboard",
  VOTE: "/vote",
  PROFILE: "/profile",
  CANDIDATES: "/candidates",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_CANDIDATES: "/admin/candidates",
  ADMIN_RESULTS: "/admin/results",
};

// Form Validation Rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  AGE: {
    MIN: 18,
    MAX: 100,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  AADHAR: {
    LENGTH: 12,
    PATTERN: /^\d{12}$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  MOBILE: {
    PATTERN: /^[6-9]\d{9}$/,
    LENGTH: 10,
  },
};

// UI Constants
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  LOADING_TIMEOUT: 30000,
};

// Status Constants
export const VOTING_STATUS = {
  NOT_VOTED: "not_voted",
  VOTED: "voted",
};

export const REQUEST_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Color Themes
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Session expired. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  ALREADY_VOTED: "You have already cast your vote.",
  INVALID_CREDENTIALS: "Invalid login credentials.",
  WEAK_PASSWORD: "Password must be at least 6 characters long.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_MOBILE: "Please enter a valid mobile number.",
  INVALID_AADHAR: "Please enter a valid 12-digit Aadhar number.",
  DUPLICATE_CANDIDATE: "A candidate with this name or party already exists.",
  ADMIN_EXISTS: "Admin account already exists. Only one admin is allowed.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  SIGNUP_SUCCESS: "Account created successfully!",
  VOTE_SUCCESS: "Vote cast successfully!",
  PASSWORD_UPDATED: "Password updated successfully!",
  CANDIDATE_ADDED: "Candidate added successfully!",
  CANDIDATE_DELETED: "Candidate deleted successfully!",
  USER_UPDATED: "User information updated successfully!",
};

// Loading Messages
export const LOADING_MESSAGES = {
  SIGNING_IN: "Signing in...",
  CREATING_ACCOUNT: "Creating account...",
  CASTING_VOTE: "Casting vote...",
  LOADING_DATA: "Loading data...",
  UPDATING: "Updating...",
  SAVING: "Saving...",
  DELETING: "Deleting...",
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: "#4F46E5",
  SECONDARY: "#06B6D4",
  SUCCESS: "#10B981",
  WARNING: "#F59E0B",
  ERROR: "#EF4444",
  GRADIENT: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"],
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
};

// File Upload Constants
export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".gif"],
};

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM DD, YYYY",
  INPUT: "YYYY-MM-DD",
  DATETIME: "MMM DD, YYYY HH:mm",
  TIME: "HH:mm",
};

// Export utility function to validate form data
export const validateFormData = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && (!value || value.toString().trim() === "")) {
      errors[field] = `${field} is required`;
      return;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      return;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must be less than ${rule.maxLength} characters`;
      return;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `Invalid ${field} format`;
      return;
    }

    if (value && rule.min && parseInt(value) < rule.min) {
      errors[field] = `${field} must be at least ${rule.min}`;
      return;
    }

    if (value && rule.max && parseInt(value) > rule.max) {
      errors[field] = `${field} must be less than ${rule.max}`;
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
