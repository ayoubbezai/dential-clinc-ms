import React, { useState } from 'react';
import ModelNoClickOut from '../other/ModelNoClickOut';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import SelectSupplierAsync from '@/components/select/SelectSupplierAsync';
import SelectUnitAsync from '@/components/select/SelectUnitAsync';
import SelectMedicineAsync from '@/components/select/SelectMedicineAsync';
import { StocksService } from '@/services/shared/StocksService';
import toast from 'react-hot-toast';

const AddStockModel = ({ isOpen, onClose, fetchStocks, t }) => {

    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [loadState, setLoadState] = useState({
        medicinesLoaded: false,
        unitsLoaded: false
    });

    const handleSupplierChange = (newSupplier) => setSelectedSupplier(newSupplier);
    const handleUnitChange = (newUnit) => setSelectedUnit(newUnit);
    const handleMedicineChange = (newMedicine) => setSelectedMedicine(newMedicine);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await StocksService.addStock(
            selectedMedicine.value,
            selectedSupplier.value,
            selectedUnit.value,
            price,
            quantity,
            expireDate
        );

        if (data) {
            toast.success(t('messages.add_success') || 'Stock added successfully!');
        } else {
            toast.error(error || t('messages.add_error') || 'Failed to add stock.');
        }

        setLoading(false);
        fetchStocks?.(1);
        onClose?.();
    };

    return (
        <ModelNoClickOut isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">{t('add_stock.title')}</h2>
                <form className="flex flex-col" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <div className="flex flex-col gap-4 mt-2 mb-4">
                            <SelectSupplierAsync
                                onChange={handleSupplierChange}
                                value={selectedSupplier}
                                onLoaded={() =>
                                    setLoadState((prev) => ({ ...prev, unitsLoaded: true }))
                                }
                                t={t}
                            />
                            <SelectUnitAsync
                                onChange={handleUnitChange}
                                value={selectedUnit}
                                load={loadState.unitsLoaded}
                                onLoaded={() =>
                                    setLoadState((prev) => ({ ...prev, medicinesLoaded: true }))
                                }
                                t={t}

                            />
                            <SelectMedicineAsync
                                onChange={handleMedicineChange}
                                value={selectedMedicine}
                                load={loadState.medicinesLoaded}
                                t={t}

                            />
                        </div>

                        <Label className="mb-2">{t('form.quantity')}</Label>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t('form.price')}</Label>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t('form.expiry')}</Label>
                        <Input
                            type="date"
                            value={expireDate}
                            onChange={(e) => setExpireDate(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className={`mt-6 px-4 py-3 text-white w-1/2 mx-auto bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? t('form.submitting') : t('form.submit')}
                    </Button>
                </form>
            </div>
        </ModelNoClickOut>
    );
};

export default AddStockModel;
