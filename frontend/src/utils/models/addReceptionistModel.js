import toast from "react-hot-toast";
import { UsersService } from "@/services/shared/UsersService";

const initializeFormData = () => ({
    name: '',
    email: '',
    password: '',
});


const handleSubmit = async (e, formData, onClose) => {
    e.preventDefault();
    console.log(formData);

    const { data, error } = await UsersService.createReceptionist(
        formData.name,
        formData.email,
        formData.password
    );

    if (data.success) {
        toast.success('Success! Receptionist created successfully');
    } else {
        toast.error(error?.message || 'Error! Something went wrong.');
    }

    onClose();
};


export { initializeFormData, handleSubmit };