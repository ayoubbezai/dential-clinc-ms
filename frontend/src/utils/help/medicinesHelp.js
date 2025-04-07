import { medicnesService } from "@/services/shared/medicnesService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const handleDeleteMedicine = async (medicine, setDeletingId, fetchMedicines) => {
  const result = await Swal.fire({
    title: `Delete "${medicine.name}"?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

    setDeletingId(medicine.id);
    const { data, error } = await medicnesService.deleteMedicine(medicine.id);
    if (data) {
      toast.success("Medicine deleted successfully!");
      fetchMedicines?.(1);
    } else {
      toast.error(error || "Failed to delete medicine.");
    }
    setDeletingId(null);
  
};
