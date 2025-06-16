import api from "../other/api";
export const EventsService = {

  async scheduleEvents(start, end) {
    try {
      console.log('EventsService: Making API call to /events with params:', { start, end });
      // API call using api - Changed from /schedule to /events
      const response = await api.get(`/events?start=${start}&end=${end}`);
      console.log('EventsService: Full API response:', response);
      console.log('EventsService: Response data:', response.data);
      
      // Check if the response has the expected structure
      if (response.data && response.data.success) {
        console.log('EventsService: Success response, returning data:', response.data.data);
        return { data: response.data.data, error: null };
      } else {
        console.log('EventsService: No success flag, returning data directly:', response.data.data || response.data);
        return { data: response.data.data || response.data || [], error: null };
      }
    } catch (error) {
      console.error('EventsService: API call failed:', error);
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
