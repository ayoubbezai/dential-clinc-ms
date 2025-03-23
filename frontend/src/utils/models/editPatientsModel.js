import toast from "react-hot-toast";
import { PatientsService } from "@/services/shared/PatientsService";
const initializeFormData = (patient) => ({
  patient_name: patient?.patient_name || "",
  phone: patient?.phone || "",
  gender: patient?.gender || "",
  age: patient?.age || "",
  diseases: patient?.diseases || "",
  note: patient?.note || "",
});



const handleSubmit = async (
  e,
  formData,
  currentPatient,
  onClose,
  refreshPatients
) => {
  e.preventDefault();
  console.log("Submitting:", formData);
const { patient_name, phone, gender, age, diseases, note } = formData;
  

  const { data, error } = await PatientsService.updatePatient(
    currentPatient.id,
    patient_name,
    phone,
    gender,
    age,
    diseases,
    note
  );

  if (data?.success) {
    toast.success("Success! Patient updated successfully");
    onClose();
    refreshPatients();
  } else {
    toast.error(error?.message || "Error! Something went wrong.");
  }
};

export { initializeFormData ,handleSubmit};