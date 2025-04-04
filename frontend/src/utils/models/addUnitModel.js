import { toast } from 'react-hot-toast';
import { UnitsService } from '@/services/shared/UnitsService';

export const handleAddUnit = async (unit, setLoading, setUnit, onClose, fetchUnits) => {
  try {
    setLoading(true);
    const { data } = await UnitsService.addUnit(unit);
    
    if (data) {
      toast.success("Unit added successfully!");
      setUnit("");  // Reset input
      onClose();    // Close modal
      fetchUnits(1); // Refresh list
    } else {
      toast.error("Failed to add unit");
    }
  } catch  {
    toast.error("An error occurred while adding the unit.");
  } finally {
    setLoading(false);
  }
};
