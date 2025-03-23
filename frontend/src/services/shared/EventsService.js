import api from "../other/api";
export const EventsService = {

  async scheduleEvents(start, end) {
    try {
      // API call using api
      const response = await api.get(`/schedule?start=${start}&end=${end}`);
      console.log(response.data);
      console.log(response.data.data);
      return { data: response.data.data, error: null }; // Return data and no error
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        data: null,
        error: error.message || "Failed to fetch events",
      }; // Return error message
    }
  },

  async deleteEvent(EventId) {
    try {
      const response = await api.delete(`/events/${EventId}`);
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to delete the  the event",
      };
    }
  },

  async addEvent(
    start_date,
    start_time,
    end_date,
    end_time,
    title,
    people,
    calendarId
  ) {
    try {
      const response = await api.post("/events", {
        start_date,
        start_time,
        end_date,
        end_time,
        title,
        people,
        calendarId,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create event",
      }; // Return error
    }
  },
  async updateEvent(
    eventId,
    start_date,
    start_time,
    end_date,
    end_time,
    title,
    people,
    location,
    calendarId
  ) {
    try {
      const response = await api.put(`/events/${eventId}`, {
        start_date,
        start_time,
        end_date,
        end_time,
        title,
        people,
        location,
        calendarId,
      });
      console.log(response);
      return { data: response.data, error: null }; // Return data and no error
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to create event",
      }; // Return error
    }
  },
};
