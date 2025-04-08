import React, { useState } from 'react';
import Model from "@/models/other/Model";
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import SelectSupplierAsync from '@/components/select/SelectSupplierAsync';
import ModelNoClickOut from '../other/ModelNoClickOut';
import SelectUnitAsync from '@/components/select/SelectUnitAsync';
import SelectMedicineAsync from '@/components/select/SelectMedicineAsync';
import { StocksService } from '@/services/shared/StocksService';
import toast from 'react-hot-toast';

const EditStockModel = ({ isOpen, onClose, refetchStocks, stock }) => {
    const [quantity, setQuantity] = useState(stock?.quantity || '');
    const [price, setPrice] = useState(stock?.price || '');
    const [expireDate, setExpireDate] = useState(stock?.expiry_date || '');
    const [loading, setLoading] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(stock?.
        supplier_name || null);
    const [selectedUnit, setSelectedUnit] = useState(stock?.unit_name || null);
    const [selectedMedicine, setSelectedMedicine] = useState(stock?.medicine_name|| null);

    console.log(stock)
    const [loadState, setLoadState] = useState({
        medicinesLoaded: false,
        unitsLoaded: false,
    });

    const handleSupplierChange = (newSupplier) => setSelectedSupplier(newSupplier);
    const handleUnitChange = (newUnit) => setSelectedUnit(newUnit);
    const handleMedicineChange = (newMedicine) => setSelectedMedicine(newMedicine);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await StocksService.editStock(
            stock.id,
            selectedMedicine?.value,
            selectedSupplier?.value,
            selectedUnit?.value,
            price,
            quantity,
            expireDate
        );

        if (data) {
            toast.success(stock ? "Stock updated successfully!" : "Stock added successfully!");
            refetchStocks?.(1);
        } else {
            toast.error(error || "Failed to update stock.");
        }

        setLoading(false);
        onClose?.();
    };

    return (
        <ModelNoClickOut isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">{stock ? "Edit Stock" : "Add Stock"}</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className='flex flex-col gap-4 mt-2 mb-4'>
                            <SelectSupplierAsync
                                onChange={handleSupplierChange}
                                value={selectedSupplier}
                                onLoaded={() => setLoadState(prev => ({ ...prev, unitsLoaded: true }))}
                                edit={true}
                            />
                            <SelectUnitAsync
                                onChange={handleUnitChange}
                                value={selectedUnit}
                                onLoaded={() => setLoadState(prev => ({ ...prev, medicinesLoaded: true }))}
                                load={loadState.unitsLoaded}
                            />
                            <SelectMedicineAsync
                                onChange={handleMedicineChange}
                                value={selectedMedicine}
                                load={loadState.medicinesLoaded}
                            />
                        </div>

                        <Label className="mb-2">Quantity</Label>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">Price</Label>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={selectClassName}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">Expiration Date</Label>
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
                        className={`mt-6 px-4 py-3 text-white w-1/2 mx-auto bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </div>
        </ModelNoClickOut>
    );
};

export default EditStockModel;
