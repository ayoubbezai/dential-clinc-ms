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
  async getConversation(id, perPage, page = 1) {
    try {
      const params = new URLSearchParams();
      const appendParam = (key, value) => {
        if (value) params.append(key, value);
      };

      appendParam("per_page", perPage);
      appendParam("page", page);

      const response = await api.get(
        `/getConversation/${id}?${params.toString()}`
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch conversation",
      };
    }
  },
  async sendMessage(reciver_id, message) {
    try {
      const response = await api.post("/sendMessage", {
        reciver_id,
        message,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to send message",
      };
    }
  },
};
