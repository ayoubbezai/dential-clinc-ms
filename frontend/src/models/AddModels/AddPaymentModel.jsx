import React, { useState } from "react";
import Swal from "sweetalert2";
import Model from "@/models/other/Model";
import { paymentService } from "@/services/dentist/paymentService";
import { Input } from "@/components/designSystem/input";
import { Button } from "@/components/designSystem/button";
import { selectClassName } from "@/constant/classNames";
import toast from "react-hot-toast";

const AddPaymentModel = ({ isOpen, onClose, folderId, folderDetails, folderPayments, fetchFolderPayments }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const totalPrice = folderDetails?.price || 0;
    const totalPaid = folderPayments?.total_payments || 0;
    const remainingAmount = (totalPrice - totalPaid) > 0 ? totalPrice - totalPaid : 0;

    async function handleAddPayment(finalAmount) {
        if (!finalAmount) return toast.error("Amount is required!");

        if (finalAmount > remainingAmount) {
            const result = await Swal.fire({
                title: "Overpayment Warning",
                text: `You're about to pay more than the remaining balance (${remainingAmount} DA). Do you want to proceed?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Proceed",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#1a75ff",
            });

            if (!result.isConfirmed) return;
        }

        setLoading(true);
        const { data, error } = await paymentService.addPayment(folderId, finalAmount, note);

        if (data?.success) {
            toast.success("Payment added successfully!");
            fetchFolderPayments(folderId);
            setAmount("");
            setNote("");
            onClose();
        } else {
            toast.error(error?.message || "Failed to add payment.");
        }
        setLoading(false);
    }

    async function handleConfirm() {
        const result = await Swal.fire({
            title: "Confirm Payment",
            text: `You entered ${amount} DA. What would you like to do?`,
            icon: "question",
            showCancelButton: true,
            showDenyButton: amount - remainingAmount > 0 && !remainingAmount < 0 ,
            confirmButtonText: "Confirm",
            denyButtonText: `Confirm with (${remainingAmount} DA)`,
            cancelButtonText: "Cancel",
            confirmButtonColor: "#1a75ff",
            denyButtonColor: "#007c8f",
            cancelButtonColor: "#6c757d",
        });

        if (result.isConfirmed) {
            handleAddPayment(parseFloat(amount));
        } else if (result.isDenied) {
            handleAddPayment(remainingAmount);
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold text-[#223354] mb-4">Add Payment</h2>

            <form className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount (DA)</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className={selectClassName}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
                    <Input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add a note (optional)"
                        className={selectClassName}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        className={"text-white"}
                        onClick={handleConfirm}
                        disabled={loading || !amount}
                    >
                        {loading ? "Processing..." : "Confirm"}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPaymentModel;
