import React from "react";
import Model from "@/models/other/Model";

const paymentsDetailsModel = ({ isOpen, onClose, payments }) => {

    console.log(payments)
    console.log(payments?.patient_name)
    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-5">
                <div className="mb-4 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">{payments?.patient_name}</h2>
                    
                    <p className="text-sm text-gray-600">Folder: <span className="font-medium">{payments?.folder_name}</span></p>
                </div>

                {/* paymentss List */}
                <div className="space-y-3">
                    {payments?.payments?.length > 0 ? (
                        payments.payments.map((pay, index) => (
                            <div key={index} className="border border-gray-200 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Date:</span> {new Date(pay.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Amount Paid:</span> <span className="text-green-600">{pay.amount} DA</span>
                                </p>
                                {pay.note && (
                                    <p className="text-sm text-gray-500 italic">Note: {pay.note}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No paymentss recorded.</p>
                    )}
                </div>
            </div>
        </Model>
    );
};

export default paymentsDetailsModel;
