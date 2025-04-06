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

const AddStockModel = ({ isOpen, onClose }) => {
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const handleSupplierChange = (newSupplier) => {
        setSelectedSupplier(newSupplier);
    };
    const handleUnitChange = (newUnit) => {
        setSelectedUnit(newUnit);
    };
    const handleMedicineChange = (newMedicine) => {
        setSelectedMedicine(newMedicine);
    };


    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(quantity)
        console.log(price)
        const { data } = await StocksService.addStock(selectedMedicine.value, selectedSupplier.value, selectedUnit.value, price, quantity, expireDate);
        console.log(data)
        setLoading(false)

    };

    

    return (
        <ModelNoClickOut isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">Add Medicine</h2>
                <form className="flex flex-col" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <div className='flex flex-col gap-4 mt-2 mb-4'>

                            <SelectSupplierAsync onChange={handleSupplierChange}
                                value={selectedSupplier}  />

                            <SelectUnitAsync
                                onChange={handleUnitChange}
                                value={selectedUnit} />

                            <SelectMedicineAsync
                                onChange={handleMedicineChange}
                                value={selectedMedicine} />

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

export default AddStockModel;
