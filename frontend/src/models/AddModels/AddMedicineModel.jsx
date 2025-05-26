import React, { useEffect, useState } from 'react';
import Model from "@/models/other/Model";
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { medicnesService } from '@/services/shared/medicnesService';
import toast from 'react-hot-toast';

const AddMedicineModel = ({ isOpen, onClose, fetchMedicines, t }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [lowStock, setLowStock] = useState('');
    const [mediumStock, setMediumStock] = useState('');
    const [goodStock, setGoodStock] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRequired, setIsRequired] = useState(false);

    useEffect(() => {
        if (lowStock || mediumStock || goodStock) {
            setIsRequired(true);
        } else {
            setIsRequired(false);
        }
    }, [lowStock, mediumStock, goodStock]);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await medicnesService.addMedicine(
            name,
            category,
            description,
            lowStock,
            mediumStock,
            goodStock,
        );
        if (data) {
            toast.success(t("add_medicine.success_message"));
        } else {
            toast.error(error);
        }
        setLoading(false);
        fetchMedicines?.(1);
        onClose?.();
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">{t("add_medicine.title")}</h2>
                <form className="flex flex-col" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <Label className="mb-2">{t("add_medicine.name")}</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_medicine.category")}</Label>
                        <Input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={selectClassName}
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_medicine.description")}</Label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={selectClassName}
                        />
                    </div>

                    <h2 className='my-2 mb-4 font-semibold'>{t("add_medicine.choose_threshold")}</h2>
                    <div className='flex gap-2 '>
                        <div className="mb-3">
                            <Label className="mb-2">{t("add_medicine.low_stock")}</Label>
                            <Input
                                type="number"
                                value={lowStock}
                                onChange={(e) => setLowStock(e.target.value)}
                                className={`${selectClassName} md:w-full `}
                                required={isRequired}
                            />
                        </div>

                        <div className="mb-3">
                            <Label className="mb-2">{t("add_medicine.medium_stock")}</Label>
                            <Input
                                type="number"
                                value={mediumStock}
                                onChange={(e) => setMediumStock(e.target.value)}
                                className={`${selectClassName} md:w-full `}
                                required={isRequired}
                            />
                        </div>

                        <div className="mb-3">
                            <Label className="mb-2">{t("add_medicine.good_stock")}</Label>
                            <Input
                                type="number"
                                value={goodStock}
                                onChange={(e) => setGoodStock(e.target.value)}
                                className={`${selectClassName} md:w-full `}
                                required={isRequired}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={`mt-6 px-4 py-3 text-white w-1/2 mx-auto bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? t("add_medicine.submitting") : t("add_medicine.submit")}
                    </Button>
                </form>
            </div>
        </Model>
    );
};

export default AddMedicineModel;
