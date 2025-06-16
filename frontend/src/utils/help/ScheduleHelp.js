export function DateUpdate(newStart, newEnd, setStart, setEnd) {
  setStart(newStart);
  setEnd(newEnd);
  console.log("Setting new date done", newStart, newEnd);
}

export function syncEvents(
  events,
  prevEvents,
  setPrevEvents,
  eventsServicePlugin
) {
  console.log('Syncing events:', { 
    newEventsCount: events.length, 
    prevEventsCount: prevEvents.length 
  });

  // If events haven't changed, don't do anything
  if (events.length === prevEvents.length && 
      events.every((event, index) => event.id === prevEvents[index]?.id)) {
    console.log('Events unchanged, skipping sync');
    return;
  }

  // Find new events to add
  const newEvents = events.filter(
    (event) => !prevEvents.some((prev) => prev.id === event.id)
  );
  
  if (newEvents.length > 0) {
    console.log('Adding new events:', newEvents);
    newEvents.forEach((event) => {
      try {
        eventsServicePlugin.add(event);
      } catch (error) {
        console.error('Error adding event:', event, error);
      }
    });
  }

  // Find events to remove
  const deletedEvents = prevEvents.filter(
    (prev) => !events.some((event) => event.id === prev.id)
  );
  
  if (deletedEvents.length > 0) {
    console.log('Removing deleted events:', deletedEvents);
    deletedEvents.forEach((event) => {
      try {
        eventsServicePlugin.remove(event.id);
      } catch (error) {
        console.error('Error removing event:', event, error);
      }
    });
  }

  // Find events to update (same ID but different content)
  const updatedEvents = events.filter((event) => {
    const prevEvent = prevEvents.find((prev) => prev.id === event.id);
    return prevEvent && (
      prevEvent.title !== event.title ||
      prevEvent.start !== event.start ||
      prevEvent.end !== event.end ||
      prevEvent.color !== event.color ||
      prevEvent.description !== event.description
    );
  });

  if (updatedEvents.length > 0) {
    console.log('Updating events:', updatedEvents);
    updatedEvents.forEach((event) => {
      try {
        eventsServicePlugin.update(event);
      } catch (error) {
        console.error('Error updating event:', event, error);
      }
    });
  }

  // Update prevEvents to current events
  setPrevEvents(events);
}
