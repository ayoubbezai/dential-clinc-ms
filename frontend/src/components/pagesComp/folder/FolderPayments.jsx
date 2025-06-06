import React, { useState, Suspense, lazy } from 'react';
import FolderPaymentsMenu from './FolderPaymentsMenu';
import ThreeDotsV from '@/components/small/ThreeDotsV';

const FolderDetailsModel = lazy(() => import('@/models/DetailsModels/PaymentDetailsModel'));
const AddPaymentModel = lazy(() => import('@/models/AddModels/AddPaymentModel'));

const FolderPayments = ({ folderDetails, folderPayments, fetchFolderPayments, folderId, t }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalPrice = folderDetails?.price || 0;
    const totalPaid = folderPayments?.total_payments || 0;
    const remainingAmount = totalPrice - totalPaid;

    return (
        <>
            <div className="col-span-4 bg-white p-4 px-5 min-h-80 shadow-sm rounded-md border border-gray-200 text-sm relative">
                <div className="flex items-center border-b justify-between pb-3 mb-3">
                    <h3 className="text-[#223354] font-bold text-lg">{t('folder_payments.title')}</h3>

                    <div className="relative">
                        <ThreeDotsV isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                        {isMenuOpen && (
                            <FolderPaymentsMenu
                                setIsMenuOpen={setIsMenuOpen}
                                setIsModelOpen={setIsModelOpen}
                                setIsAddModelOpen={setIsAddModelOpen}
                                t={t}
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-6 h-[85%] items-center justify-center">
                    <p className="border border-gray-200 text-base w-[80%] text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>{t('folder_payments.total')}:</span>
                        <span className="text-[#1a75ff]">{totalPrice} DA</span>
                    </p>

                    <p className="border border-gray-200 w-[80%] text-base text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>{t('folder_payments.paid')}:</span>
                        <span className="text-[#007c8f]">{totalPaid} DA</span>
                    </p>

                    <p className="border border-gray-200 w-[80%] bg-gray-100 text-base text-black font-semibold px-3 py-3 flex justify-between items-center">
                        <span>{t('folder_payments.rest')}:</span>
                        <span className={remainingAmount <= 0 ? "text-[#007c8f]" : "text-red-500"}>
                            {remainingAmount <= 0 ? t('folder_payments.done') : `${remainingAmount} DA`}
                        </span>
                    </p>
                </div>
            </div>

            {isModelOpen && (
                <Suspense fallback={<div>{t('loading')}</div>}>
                    <FolderDetailsModel
                        isOpen={isModelOpen}
                        onClose={() => setIsModelOpen(false)}
                        folderPayments={folderPayments}
                        folderDetails={folderDetails}
                        t={t}
                    />
                </Suspense>
            )}

            {isAddModelOpen && (
                <Suspense fallback={<div>{t('loading')}</div>}>
                    <AddPaymentModel
                        isOpen={isAddModelOpen}
                        onClose={() => setIsAddModelOpen(false)}
                        folderId={folderId}
                        folderDetails={folderDetails}
                        fetchFolderPayments={fetchFolderPayments}
                        folderPayments={folderPayments}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderPayments;
