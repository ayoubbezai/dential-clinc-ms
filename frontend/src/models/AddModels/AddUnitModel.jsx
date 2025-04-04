import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Model from "../other/Model";
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { UnitsService } from '@/services/shared/UnitsService';

const AddUnitModel = ({ isOpen, onClose, fetchUnits }) => {
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await UnitsService.addUnit(unit);
    if (data) {
      toast.success("Unit added successfully!");
      setUnit("");
      onClose();
      fetchUnits(1);
    } else {
      toast.error("Failed to add unit");
    }
    setLoading(false);
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          Unit Name
        </label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Enter Unit Name"
          className={`${selectClassName} mt-2`}
          required
        />
        <Button type="submit" className={"text-white ml-2 "} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Model>
  );
};

export default AddUnitModel;
