import React, { useState, Suspense, lazy } from 'react';

const FolderDetailsModel = lazy(() => import('@/models/DetailsModels/PaymentDetailsModel'));

const FolderPayments = ({ folderDetails, folderPayments  }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    return (
        <>
            <div className="col-span-4 bg-white p-4 px-5 shadow-sm rounded-md border  border-gray-200 text-sm">
                <div className="flex items-center border-b justify-between pb-3 mb-3">
                    <h3 className="text-[#223354] font-bold text-lg   ">Payments</h3>

                    <button
                        className="font-semibold text-sm text-blue-500 hover:underline cursor-pointer"
                        onClick={() => setIsModelOpen(!isModelOpen)}
                    >
                        View details
                    </button>
                </div>
                <div className="flex flex-col gap-6 h-[85%] items-center justify-center">
                    <p className="border border-gray-200 text-base w-[80%] text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>Total: </span> <span className="text-blue-500">{folderDetails?.price}</span> <span>DA</span>
                    </p>
                    <p className="border border-gray-200 w-[80%] text-base text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>Paid: </span> <span className="text-black">{folderPayments?.total_payments || 0}</span> <span>DA</span>
                    </p>
                    <p className="border border-gray-200 w-[80%] bg-gray-100 text-base text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>Rest: </span> <span className="text-red-500">{folderDetails?.price - (folderPayments?.total_payments || 0)}</span> <span>DA</span>
                    </p>
                </div>
            </div>

            {isModelOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <FolderDetailsModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} payments={folderPayments} />
                </Suspense>
            )}
        </>
    );
};

export default FolderPayments;
