
import toast from "react-hot-toast";
import { AppointmentService } from "@/services/shared/AppointmentsService";
const initializeFormData = (appointment) => ({
  date: appointment?.date || "",
  title: appointment?.title || "",
  tooth: appointment?.tooth || "",
  content: appointment?.content || "",
  status: appointment?.status || "",
});



const handleSubmit = async (e, formData, currentAppointment, onClose, refreshAppointments) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    const { data, error } = await AppointmentService.updateAppointments(
      currentAppointment.id,
      formData.date,
      formData.title,
      formData.tooth,
      formData.content,
      formData.status,
    );

    if (data?.success) {
        toast.success('Success! Appointment updated successfully');
        onClose();
        refreshAppointments();
    } else {
        toast.error(error?.message || 'Error! Something went wrong.');
    }
};

export { initializeFormData, handleSubmit };