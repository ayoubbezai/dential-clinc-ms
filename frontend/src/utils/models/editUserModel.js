import toast from "react-hot-toast";
import { UsersService } from "@/services/shared/UsersService";

const handleChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleSubmit = async ({ e, formData, currentUser, onClose, refreshUsers }) => {
    e.preventDefault();

    // If password fields are filled, ensure they match
    if (formData.password && formData.password !== formData.password_confirmation) {
        toast.error("Passwords do not match.");
        return;
    }

    console.log("Submitting:", formData);

    // Create payload with only the fields that need updating
    const payload = {
        name: formData.name,
        role_name: formData.role_name,
        email: formData.email,
    };

    // Include password fields only if the user provided a new password
    if (formData.password) {
        payload.password = formData.password;
        payload.password_confirmation = formData.password_confirmation;
    }

    const { data, error } = await UsersService.updateUser(currentUser.id, payload);

    if (data?.success) {
        toast.success('Success! User details updated successfully');
        onClose();
        refreshUsers();
    } else {
        toast.error(error?.message || 'Error! Something went wrong.');
    }
};

export { handleChange ,handleSubmit};