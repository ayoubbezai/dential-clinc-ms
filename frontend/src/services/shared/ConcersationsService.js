import api from "../other/api";

export const ConversationService = {
  async getConversations(perPage, page = 1, search) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("search", search);
      appendParam("per_page", perPage);
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
