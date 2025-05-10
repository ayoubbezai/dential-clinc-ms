import axios from "axios";

export const agentService = {
  async sendMessage(question) {
    try {
      const response = await axios.post("http://192.168.1.8:8000/ask", {
        question,
      });
      console.log(response);
      return { data: response, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: error };
    }
  },
};
