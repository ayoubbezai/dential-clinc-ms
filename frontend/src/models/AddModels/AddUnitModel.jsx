import React, { useState } from 'react';
import Model from "../other/Model";
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { handleAddUnit } from '@/utils/models/addUnitModel';

const AddUnitModel = ({ isOpen, onClose, fetchUnits, t }) => {
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUnit(unit, setLoading, setUnit, onClose, fetchUnits);
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <label className="block text-sm font-medium text-gray-700">
          {t('units.unit_name')}
        </label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder={t('units.enter_unit_name')}
          className={`${selectClassName} mt-2`}
          required
        />
        <Button type="submit" className="text-white ml-2 mt-4" disabled={loading}>
          {loading ? t('units.submitting') : t('units.submit')}
        </Button>
      </form>
    </Model>
  );
};

export default AddUnitModel;
