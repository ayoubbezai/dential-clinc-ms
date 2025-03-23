import { PatientsService } from "@/services/shared/PatientsService";
import toast from "react-hot-toast";
const initializeFormData = () => ({
    patient_name: '',
    phone: '',
    gender: '',
    age: '',
    diseases: '',
    note: '',
});



const handleSubmit = async (e, formData, onClose) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    const { data, error } = await PatientsService.createPatient(
        formData.patient_name,
        formData.phone,
        formData.gender,
        formData.age,
        formData.diseases,
        formData.note
    );

    if (data?.success) {
        toast.success('Success! Patient created successfully');
        onClose();
    } else {
        toast.error(error?.message || 'Error! Something went wrong.');
    }
};


export { initializeFormData ,handleSubmit};