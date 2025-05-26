import React, { useState } from "react";
import Model from "@/models/other/Model";
import { Input } from "@/components/designSystem/input";
import { Button } from "@/components/designSystem/button";
import { selectClassName } from "@/constant/classNames";
import toast from "react-hot-toast";
import { paymentService } from "@/services/dentist/paymentService";
import { useTranslation } from "react-i18next";

const AddPaymentExpense = ({ isOpen, onClose, refetch }) => {
  const { t } = useTranslation("payments");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return toast.error(t("add_payment_model.amount_required"));

    setLoading(true);
    const { data, error } = await paymentService.addPayment(null, amount, note, "expense");

    if (data?.success) {
      toast.success(t("add_payment_model.payment_added_success"));
      refetch();
      setAmount("");
      setNote("");
      onClose();
    } else {
      toast.error(error?.message || t("add_payment_model.payment_failed"));
    }
    setLoading(false);
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">{t("add_payment_model.add_expense_title")}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">{t("add_payment_model.amount_label")}</label>
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
          <label className="block text-sm font-medium">{t("add_payment_model.note_label")}</label>
          <Input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("add_payment_model.note_placeholder")}
            className={`${selectClassName} mt-2`}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("add_payment_model.cancel")}
          </Button>
          <Button className="text-white" disabled={loading || !amount}>
            {loading ? t("add_payment_model.processing") : t("add_payment_model.add_expense_button")}
          </Button>
        </div>
      </form>
    </Model>
  );
};

export default AddPaymentExpense;
