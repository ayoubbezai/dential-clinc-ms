import { UnitsService } from "@/services/shared/UnitsService";
import { toast } from "react-hot-toast";

export const handleDeleteUnit = async (unitId, fetchUnits, setDeletingId) => {
  try {
    setDeletingId(unitId);
    const { data } = await UnitsService.deleteUnit(unitId);
    if (data) {
      toast.success("Unit deleted successfully!");
      fetchUnits(1);
    } else {
      toast.error("Failed to delete unit");
    }
  } catch  {
    toast.error("An error occurred during deletion.");
  } finally {
    setDeletingId(null);
  }
};
