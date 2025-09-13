import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(import.meta.env.VITE_JWT_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(import.meta.env.VITE_JWT_TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post("/user/login", credentials),
  signup: (userData) => api.post("/user/signup", userData),
  getProfile: () => api.get("/user/profile"),
  updatePassword: (passwords) => api.put("/user/profile/password", passwords),
};

export const candidateAPI = {
  getAll: () => api.get("/candidate"),
  create: (candidateData) => api.post("/candidate", candidateData),
  vote: (candidateId) => api.post(`/candidate/vote/${candidateId}`),
  delete: (candidateId) => api.delete(`/candidate/${candidateId}`),
  getResults: () => api.get("/candidate/results"),
};

export const userAPI = {
  getAll: () => api.get("/user"),
  updateVoteStatus: (userId, status) =>
    api.put(`/user/vote-status/${userId}`, { isVoted: status }),
};
