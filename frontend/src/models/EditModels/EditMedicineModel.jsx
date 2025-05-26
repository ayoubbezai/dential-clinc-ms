import React, { useEffect, useState } from 'react';
import Model from '@/models/other/Model';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { medicnesService } from '@/services/shared/medicnesService';
import toast from 'react-hot-toast';

const EditMedicineModel = ({ isOpen, onClose, refetchMedicines, medicine, t }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [lowStock, setLowStock] = useState('');
    const [mediumStock, setMediumStock] = useState('');
    const [goodStock, setGoodStock] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRequired, setIsRequired] = useState(false);

    useEffect(() => {
        if (medicine) {
            setName(medicine.name || '');
            setCategory(medicine.category || '');
            setDescription(medicine.description || '');
            setLowStock(medicine.low_stock_threshold || '');
            setMediumStock(medicine.medium_stock_threshold || '');
            setGoodStock(medicine.good_stock_threshold || '');
        }
    }, [medicine]);

    useEffect(() => {
        setIsRequired(!!(lowStock || mediumStock || goodStock));
    }, [lowStock, mediumStock, goodStock]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await medicnesService.editMedicine(
            medicine.id,
            name,
            category,
            description,
            lowStock,
            mediumStock,
            goodStock
        );

        if (data) {
            toast.success(t('edit_medicine.success_message'));
            refetchMedicines?.(1);
            onClose?.();
        } else {
            toast.error(error || t('edit_medicine.error_message'));
        }

        setLoading(false);
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">{t('edit_medicine.title')}</h2>
                <form className="flex flex-col" onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <Label className="mb-2">{t('edit_medicine.name')}</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t('edit_medicine.category')}</Label>
                        <Input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={selectClassName}
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t('edit_medicine.description')}</Label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={selectClassName}
                        />
                    </div>

                    <h2 className="my-2 mb-4 font-semibold">{t('edit_medicine.choose_threshold')}</h2>
                    <div className="flex gap-2">
                        <div className="mb-3">
                            <Label className="mb-2">{t('edit_medicine.low_stock')}</Label>
                            <Input
                                type="number"
                                value={lowStock}
                                onChange={(e) => setLowStock(e.target.value)}
                                className={`${selectClassName} md:w-full`}
                                required={isRequired}
                            />
                        </div>

                        <div className="mb-3">
                            <Label className="mb-2">{t('edit_medicine.medium_stock')}</Label>
                            <Input
                                type="number"
                                value={mediumStock}
                                onChange={(e) => setMediumStock(e.target.value)}
                                className={`${selectClassName} md:w-full`}
                                required={isRequired}
                            />
                        </div>

                        <div className="mb-3">
                            <Label className="mb-2">{t('edit_medicine.good_stock')}</Label>
                            <Input
                                type="number"
                                value={goodStock}
                                onChange={(e) => setGoodStock(e.target.value)}
                                className={`${selectClassName} md:w-full`}
                                required={isRequired}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={`mt-6 px-4 py-3 text-white w-1/2 mx-auto bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? t('edit_medicine.submitting') : t('edit_medicine.submit')}
                    </Button>
                </form>
            </div>
        </Model>
    );
};

export default EditMedicineModel;
