import React, { useState, useEffect } from 'react';
import Model from "../other/Model";
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { handleEditSupplier } from '@/utils/help/supplierHelp';

const EditSupplierModel = ({ isOpen, onClose, fetchSuppliers, currentSupplier, t }) => {
    const [supplier, setSupplier] = useState(currentSupplier || {});
    const [loading, setLoading] = useState(false);

    // Update local state if currentSupplier changes
    useEffect(() => {
        setSupplier(currentSupplier || {});
    }, [currentSupplier]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSupplier(supplier, setLoading, fetchSuppliers, onClose);
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className='flex flex-col w-5/6 mx-auto ml-3'>
                <label className="block text-sm font-medium text-gray-700">
                    {t('suppliers.edit.name_label')}
                </label>
                <input
                    type="text"
                    value={supplier?.name || ''}
                    onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                    placeholder={t('suppliers.edit.name_placeholder')}
                    className={`${selectClassName} mt-2`}
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    {t('suppliers.edit.contact_info_label')}
                </label>
                <input
                    type="text"
                    value={supplier?.contact_info || ''}
                    onChange={(e) => setSupplier({ ...supplier, contact_info: e.target.value })}
                    placeholder={t('suppliers.edit.contact_info_placeholder')}
                    className={`${selectClassName} mt-2`}
                />

                <Button type="submit" className="text-white ml-2 mt-4 self-center" disabled={loading}>
                    {loading ? t('suppliers.edit.submitting') : t('suppliers.edit.submit')}
                </Button>
            </form>
        </Model>
    );
};

export default EditSupplierModel;
