import React, { useState } from "react";
import Swal from "sweetalert2";
import Model from "@/models/other/Model";
import { paymentService } from "@/services/dentist/paymentService";
import { Input } from "@/components/designSystem/input";
import { Button } from "@/components/designSystem/button";
import { selectClassName } from "@/constant/classNames";
import toast from "react-hot-toast";

const AddPaymentModel = ({ isOpen, onClose, folderId, folderDetails, fetchFolderPayments, folderPayments, t }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionType, setTransactionType] = useState("income");
    const [isNoteRequired, setIsNoteRequired] = useState(false);

    const totalPrice = folderDetails?.price || 0;
    const totalPaid = folderPayments?.total_payments || 0;
    const remainingAmount = Math.max(totalPrice - totalPaid, 0);

    function handleTransactionTypeChange(e) {
        const newType = e.target.value;
        setTransactionType(newType);
        setIsNoteRequired(newType === "refund");
    }

    async function handleAddPayment(finalAmount) {
        if (!finalAmount) return toast.error(t("add_payment_model.error_amount_required"));
        if (isNoteRequired && !note) return toast.error(t("add_payment_model.error_refund_reason_required"));

        setLoading(true);
        const { data, error } = await paymentService.addPayment(folderId, finalAmount, note, transactionType);

        if (data?.success) {
            toast.success(
                transactionType === "income"
                    ? t("add_payment_model.success_payment_added")
                    : t("add_payment_model.success_refund_processed")
            );
            fetchFolderPayments(folderId);
            setAmount("");
            setNote("");
            onClose();
        } else {
            toast.error(error?.message || t("add_payment_model.error_processing_transaction"));
        }
        setLoading(false);
    }

    async function handleConfirm() {
        if (transactionType === "refund") {
            const refundResult = await Swal.fire({
                title: t("add_payment_model.confirm_refund_title"),
                text: t("add_payment_model.confirm_refund_text", { amount }),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: t("add_payment_model.confirm_refund_confirm"),
                cancelButtonText: t("add_payment_model.confirm_refund_cancel"),
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#6c757d",
            });

            if (refundResult.isConfirmed) {
                handleAddPayment(parseFloat(amount));
            }
            return;
        }

        const result = await Swal.fire({
            title: t("add_payment_model.confirm_payment_title"),
            text: t("add_payment_model.confirm_payment_text", { amount }),
            icon: "question",
            showCancelButton: true,
            showDenyButton: amount - remainingAmount > 0,
            confirmButtonText: t("add_payment_model.confirm_payment_confirm"),
            denyButtonText: t("add_payment_model.confirm_payment_deny", { remainingAmount }),
            cancelButtonText: t("add_payment_model.confirm_payment_cancel"),
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
            <h2 className="text-lg font-semibold text-[#223354] mb-4">{t("add_payment_model.title")}</h2>

            <form className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("add_payment_model.transaction_type_label")}</label>
                    <select
                        value={transactionType}
                        onChange={handleTransactionTypeChange}
                        className={`${selectClassName} w-full mt-2`}
                    >
                        <option value="income">{t("add_payment_model.transaction_type_pay")}</option>
                        <option value="refund">{t("add_payment_model.transaction_type_refund")}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("add_payment_model.amount_label")}</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t("add_payment_model.amount_placeholder")}
                        className={`${selectClassName} mt-2`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {transactionType === "refund"
                            ? t("add_payment_model.refund_reason_label")
                            : t("add_payment_model.note_label")}
                    </label>
                    <Input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={
                            transactionType === "refund"
                                ? t("add_payment_model.refund_reason_placeholder")
                                : t("add_payment_model.note_placeholder")
                        }
                        className={`${selectClassName} mt-2`}
                        required={isNoteRequired}
                    />
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                        {t("add_payment_model.cancel_button")}
                    </Button>

                    <Button
                        type="button"
                        className="text-white"
                        onClick={handleConfirm}
                        disabled={loading || !amount || (isNoteRequired && !note)}
                    >
                        {loading
                            ? t("add_payment_model.processing")
                            : transactionType === "refund"
                                ? t("add_payment_model.refund_button")
                                : t("add_payment_model.confirm_button")}
                    </Button>
                </div>
            </form>
        </Model>
    );
};

export default AddPaymentModel;
