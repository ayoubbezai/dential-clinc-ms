import { suppliersService } from "@/services/shared/supplierService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const handleDeleteSupplier = async (
  supplierId,
  fetchSuppliers
) => {
  const result = await Swal.fire({
    title: "Delete this supplier?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  const { data } = await suppliersService.deleteSupplier(supplierId);

  if (data) {
    toast.success("Supplier deleted successfully!");
    fetchSuppliers?.(1);
  } else {
    toast.error("Failed to delete supplier.");
  }

};

export  const handleEditSupplier = async (supplier, setLoading, fetchSuppliers, onClose) => {
  setLoading(true);
  const { data, error } = await suppliersService.editSupplier(
    supplier.id,
    supplier.name,
    supplier.contact_info
  );

  if (error && !data) {
    toast.error(error);
    setLoading(false);
  } else {
    toast.success("Supplier updated successfully!");
    onClose();
    fetchSuppliers?.(1);
    setLoading(false);
  }
};