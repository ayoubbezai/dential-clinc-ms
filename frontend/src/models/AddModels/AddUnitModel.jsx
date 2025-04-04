import React, { useState } from 'react';
import Model from "../other/Model";
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { handleAddUnit } from '@/utils/handleAddUnit';

const AddUnitModel = ({ isOpen, onClose, fetchUnits }) => {
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUnit(unit, setLoading, setUnit, onClose, fetchUnits);
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
        <Button type="submit" className="text-white ml-2" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Model>
  );
};

export default AddUnitModel;
