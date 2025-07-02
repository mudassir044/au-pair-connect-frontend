import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://au-pair.onrender.com";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Network error (CORS, server down, etc.)
    if (!error.response) {
      if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
        toast.error(
          "Unable to connect to server. Please check if the backend is running.",
        );
        console.error(
          "Network Error - Possible CORS issue or server down:",
          error,
        );
      } else {
        toast.error("Connection failed. Please try again.");
      }
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.response?.status >= 400) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    role: "au_pair" | "host_family";
    firstName: string;
    lastName: string;
  }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

// User API calls
export const userApi = {
  updateProfile: async (data: any) => {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  getMatches: async () => {
    const response = await api.get("/users/matches");
    return response.data;
  },

  uploadDocument: async (file: File, type: string) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("type", type);

    const response = await api.post("/users/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

// Booking API calls
export const bookingApi = {
  create: async (data: any) => {
    const response = await api.post("/bookings", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },
};

// Messages API calls
export const messageApi = {
  getConversations: async () => {
    const response = await api.get("/messages/conversations");
    return response.data;
  },

  getMessages: async (conversationId: string) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  },

  send: async (conversationId: string, content: string) => {
    const response = await api.post(`/messages/${conversationId}`, { content });
    return response.data;
  },
};
