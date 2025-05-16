import React, { useState } from "react";
import Model from "@/models/other/Model";
import { Input } from "@/components/designSystem/input";
import { Button } from "@/components/designSystem/button";
import { selectClassName } from "@/constant/classNames";
import toast from "react-hot-toast";
import { paymentService } from "@/services/dentist/paymentService";


const AddPaymentExpense = ({ isOpen, onClose, refetch }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return toast.error("Amount is required!");

    setLoading(true);
    const { data, error } = await paymentService.addPayment(null, amount, note, "expense");

    if (data?.success) {
      toast.success("Payment added successfully!");
      refetch();
      setAmount("");
      setNote("");
      onClose();
    } else {
      toast.error(error?.message || "Failed to process the transaction.");
    }
    setLoading(false);
  };



  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">Amount</label>
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
          <label className="block text-sm font-medium">Note (Optional)</label>
          <Input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note"
            className={`${selectClassName} mt-2`}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="text-white"
            disabled={loading || !amount}>
            {loading ? "Processing..." : "Add Expense"}
          </Button>
        </div>
      </form>
    </Model>
  );
};

export default AddPaymentExpense
