import React, { useState } from 'react'

const calander = () => {
    const [events, setEvents] = useState(null)

    async function getEvents() {
        const url = "http://localhost:8000/api/events";
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Add token to headers
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            const filteredEvents = data.data.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                location: event.location,
                people: event.people || []
            }));
            console.log(filteredEvents);
            setEvents(filteredEvents);
            return filteredEvents

        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div>
        {events}
      
    </div>
  )
}

export default calander
