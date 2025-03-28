import React from "react";
import Model from "@/models/other/Model";

const PaymentsDetailsModel = ({ isOpen, onClose, folderPayments, folderDetails }) => {
    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-5">
                <div className="mb-4 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">{folderDetails?.patient_name}</h2>
                    <p className="text-sm text-gray-600">
                        Folder: <span className="font-medium">{folderDetails?.folder_name}</span>
                    </p>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto">
                    {folderPayments?.details?.length > 0 ? (
                        folderPayments?.details?.map((pay, index) => (
                            <div key={index} className="border border-gray-200 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Date:</span> {new Date(pay.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">
                                        {pay.type === "out" ? "Refunded" : "Paid"}:
                                    </span>{" "}
                                    <span className={pay.type === "out" ? "text-red-600" : "text-green-600"}>
                                        {pay.amount} DA
                                    </span>
                                </p>
                                {pay.note && (
                                    <p className="text-sm text-gray-500 italic">{pay.type === "in" ? "Note :" : "Refund Reason :"}{pay.note}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No payments recorded.</p>
                    )}
                </div>
            </div>
        </Model>
    );
};

export default PaymentsDetailsModel;
