import { toast } from "react-hot-toast";
import { suppliersService } from "@/services/shared/supplierService";

export const handleSubmitSupplier = async (
  name,
  contact_info,
  setLoading,
  setSupplier,
  onClose,
  fetchSuppliers
) => {
  setLoading(true);
  const { data } = await suppliersService.addSupplier(name, contact_info);
  if (data) {
    toast.success("Supplier added successfully!");
    setSupplier({ name: "", contact_info: "" });
    onClose();
    fetchSuppliers(1);
  } else {
    toast.error("Failed to add supplier");
  }
  setLoading(false);
};
