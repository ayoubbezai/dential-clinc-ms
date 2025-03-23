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
  const newEvents = events.filter(
    (event) => !prevEvents.some((prev) => prev.id === event.id)
  );
  if (newEvents.length > 0) {
    newEvents.forEach((event) => eventsServicePlugin.add(event));
  }

  const deletedEvents = prevEvents.filter(
    (prev) => !events.some((event) => event.id === prev.id)
  );
  if (deletedEvents.length > 0) {
    deletedEvents.forEach((event) => eventsServicePlugin.remove(event.id));
  }

  setPrevEvents(events);
}
