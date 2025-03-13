import api from "./api";

export const AuthService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log(response.data);

      if (!response.data.success || !response.data.token) {
        return {
          user: null,
          token: null,
          message: null,
          error: { message: "Login failed. Please try again." },
        };
      }

      const { user, token } = response.data;

      localStorage.setItem("token", token);

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
