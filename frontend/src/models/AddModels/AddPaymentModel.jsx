import React, { useState } from "react";
import Swal from "sweetalert2";
import Model from "@/models/other/Model";
import { paymentService } from "@/services/dentist/paymentService";
import { Input } from "@/components/designSystem/input";
import { Button } from "@/components/designSystem/button";
import { selectClassName } from "@/constant/classNames";
import toast from "react-hot-toast";

const AddPaymentModel = ({ isOpen, onClose, folderId, folderDetails, fetchFolderPayments, folderPayments }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionType, setTransactionType] = useState("in");
    const [isNoteRequired, setIsNoteRequired] = useState(false);

    const totalPrice = folderDetails?.price || 0;
    const totalPaid = folderPayments?.total_payments || 0;
    const remainingAmount = Math.max(totalPrice - totalPaid, 0);

    function handleTransactionTypeChange(e) {
        const newType = e.target.value;
        setTransactionType(newType);
        setIsNoteRequired(newType === "out");
    }

    async function handleAddPayment(finalAmount) {
        if (!finalAmount) return toast.error("Amount is required!");
        if (isNoteRequired && !note) return toast.error("Refund reason is required!");

        setLoading(true);
        const { data, error } = await paymentService.addPayment(folderId, finalAmount, note, transactionType);

        if (data?.success) {
            toast.success(transactionType === "in" ? "Payment added successfully!" : "Refund processed successfully!");
            fetchFolderPayments(folderId);
            setAmount("");
            setNote("");
            onClose();
        } else {
            toast.error(error?.message || "Failed to process the transaction.");
        }
        setLoading(false);
    }

    async function handleConfirm() {
        if (transactionType === "out") {
            const refundResult = await Swal.fire({
                title: "Confirm Refund",
                text: `Are you sure you want to refund ${amount} DA?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Refund",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#6c757d",
            });

            if (refundResult.isConfirmed) {
                handleAddPayment(parseFloat(amount));
            }
            return;
        }

        const result = await Swal.fire({
            title: "Confirm Payment",
            text: `You entered ${amount} DA. What would you like to do?`,
            icon: "question",
            showCancelButton: true,
            showDenyButton: amount - remainingAmount > 0,
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
                    <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                    <select
                        value={transactionType}
                        onChange={handleTransactionTypeChange}
                        className={`${selectClassName} w-full mt-2`}
                    >
                        <option value="in">Pay</option>
                        <option value="out">Refund</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount (DA)</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className={`${selectClassName} mt-2`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {transactionType === "out" ? "Refund Reason" : "Note (Optional)"}
                    </label>
                    <Input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={transactionType === "out" ? "Enter refund reason" : "Add a note (optional)"}
                        className={`${selectClassName} mt-2`}
                        required={isNoteRequired}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        className="text-white"
                        onClick={handleConfirm}
                        disabled={loading || !amount || (isNoteRequired && !note)}
                    >
                        {loading ? "Processing..." : transactionType === "out" ? "Refund" : "Confirm"}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPaymentModel;
