import api from "../other/api"



export const noteService = {
  async addNote(folder_id, title, content) {
    try {
      const response = await api.post("/notes", { folder_id, title, content });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null.data, error: error };
    }
  },
  async editNote(note_id, content) {
    try {
      const response = await api.put(`/notes/${note_id}`, { content });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null.data, error: error };
    }
  },
  async deleteNote(note_id) {
    try {
      const response = await api.delete(`/notes/${note_id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log("err", err);
      return err
    }
  },
};