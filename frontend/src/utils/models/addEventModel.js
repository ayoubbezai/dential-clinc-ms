
export const initializeFormData = () => ({
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  title: "",
  people: "",
  calendarId: "",
});



export const handleSelectChange = (setFormData) => (e) => {
  setFormData((prev) => ({
    ...prev,
    calendarId: e.target.value,
  }));
};


