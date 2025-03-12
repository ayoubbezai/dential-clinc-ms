import api from "./api";

export const AuthService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (!response.data.success || !response.data.token) {
        return {
          user: null,
          token: null,
          message: response.data.message || "Invalid credentials",
          error: { message: "Login failed. Please try again." },
        };
      }

      const { user, token } = response.data;

      // ✅ Store data correctly
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role); // ✅ No need for JSON.stringify()

      return {
        user,
        token,
        error: null,
        message: response.data.message,
      };
    } catch (error) {
      return {
        user: null,
        token: null,
        message: null,
        error: error.response?.data || {
          message: "Something went wrong. Please try again.",
        },
      };
    }
  },
};
