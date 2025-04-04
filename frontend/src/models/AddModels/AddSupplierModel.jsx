import React, { useState } from 'react';
import Model from "../other/Model";
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { handleSubmitSupplier } from '@/utils/models/addSupplierModel';


const AddSupplierModel = ({ isOpen, onClose, fetchSuppliers }) => {
    const [supplier, setSupplier] = useState({
        name: "",
        contact_info: ""
    });
    const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
      handleSubmitSupplier(supplier.name, supplier.contact_info, setLoading, setSupplier, onClose, fetchSuppliers);
  };


    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className='flex flex-col w-5/6 mx-auto ml-3'>
                <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                <input
                    type="text"
                    value={supplier.name}
                    onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                    placeholder="Enter Supplier Name"
                    className={`${selectClassName} mt-2`}
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">Contact Info</label>
                <input
                    type="text"
                    value={supplier.contact_info}
                    onChange={(e) => setSupplier({ ...supplier, contact_info: e.target.value })}
                    placeholder="Enter Contact Info"
                    className={`${selectClassName} mt-2`}
                />

                <Button type="submit" className="text-white ml-2 mt-4 self-center" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Model>
    );
};

export default AddSupplierModel;
