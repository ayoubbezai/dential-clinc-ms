import api from "../other/api";

export const ConversationService = {
  async getConversations(per_page, page = 1) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("per_page", per_page);
      appendParam("page", page);

      // API call using api
      const response = await api.get(
        `/getAllConversation?${params.toString()}`
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch conversations",
      };
    }
  },
};
