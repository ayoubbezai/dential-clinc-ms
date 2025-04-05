import { suppliersService } from "@/services/shared/supplierService";
import { toast } from "react-hot-toast";

export const handleDeleteSupplier = async (
  supplierId,
  setDeletingId,
  fetchSuppliers
) => {
  try {
    setDeletingId(supplierId);
    const { data } = await suppliersService.deleteSupplier(supplierId);
    if (data) {
      toast.success("Supplier deleted successfully!");
      fetchSuppliers(1);
    } else {
      toast.error("Failed to delete supplier");
    }
  } catch {
    toast.error("An error occurred during deletion.");
  } finally {
    setDeletingId(null);
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