import api from "./api";

export const AuthService = {
  // 🟢 Login Function
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log(response.data.user);

      return {
        user: response.data.user || null,
        token: response.data.token || null,
        error: null,
        message: "Login successful",
      };
    } catch (error) {
      return {
        user: null,
        token: null,
        error: true,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  // 🟢 Get Current User
  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          user: null,
          token: null,
          error: true,
          message: "No token found",
        };
      }

      // Ensure the token is sent with the request
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User data response:", response.data); // Debugging

      return {
        user: response.data?.user || null,
        token,
        error: null,
        message: "User data retrieved",
      };
    } catch (error) {
      console.error(
        "Error fetching current user:",
        error.response?.data || error
      );

      return {
        user: null,
        token: null,
        error: true,
        message: error.response?.data?.message || "Failed to fetch user",
      };
    }
  },

  // 🟢 Logout Function
  async logout() {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");

      return {
        user: null,
        token: null,
        error: null,
        message: "Logout successful",
      };
    } catch (error) {
      return {
        user: null,
        token: null,
        error: true,
        message: "Logout failed",
      };
    }
  },
};
