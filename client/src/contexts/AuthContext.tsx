import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "au_pair" | "host_family" | "admin";
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    role: "au_pair" | "host_family";
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);

          // Verify token is still valid
          await authApi.getProfile();
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const { token, user: userData } = response;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Welcome back!");
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    role: "au_pair" | "host_family";
    firstName: string;
    lastName: string;
  }) => {
    try {
      console.log(
        "Attempting to register with backend:",
        "https://au-pair.onrender.com",
      );
      const response = await authApi.register(userData);
      const { token, user: newUser } = response;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
