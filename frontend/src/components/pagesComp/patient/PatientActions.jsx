import React, { useState, lazy, Suspense, useEffect, useCallback } from "react";
import { FaEllipsisH } from "react-icons/fa";

// Lazy load modals
const AddPatientAccModel = lazy(() => import("@/models/AddModels/AddPatientAccModel"));
const EditPatientModel = lazy(() => import("@/models/EditModels/EditPatientModel"));
const EditUserModel = lazy(() => import("@/models/EditModels/EditUserModel"));

const PatientActions = ({ patient, refetchPatient }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddAccountModel, setIsAddAccountModel] = useState(false);
    const [isEditAccountModel, setIsEditAccountModel] = useState(false);

    // ✅ Preload modals when the component mounts (makes them open instantly)
    useEffect(() => {
        import("@/models/AddModels/AddPatientAccModel");
        import("@/models/EditModels/EditPatientModel");
        import("@/models/EditModels/EditUserModel");
    }, []);

    // ✅ Optimize menu state updates
    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="text-[#223354] font-bold text-xl pb-3">Patient Details</h3>

                <div className="relative mb-2">
                    <button className="p-2 rounded-full hover:bg-gray-200" onClick={toggleMenu}>
                        <FaEllipsisH className="text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                            {patient?.user?.email ? (
                                <button
                                    onClick={() => {
                                        setIsEditAccountModel(true);
                                        setMenuOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Edit Account
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsAddAccountModel(true);
                                        setMenuOpen(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Add Account
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(true);
                                    setMenuOpen(false);
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Edit Patient
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Single Suspense Wrapper for All Modals */}
            <Suspense fallback={<p>Loading...</p>}>
                {isEditModalOpen && (
                    <EditPatientModel
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        currentPatient={patient}
                        refreshPatients={refetchPatient}
                    />
                )}

                {isAddAccountModel && (
                    <AddPatientAccModel
                        isOpen={isAddAccountModel}
                        onClose={() => setIsAddAccountModel(false)}
                        id={patient.id}
                        refreshPatients={refetchPatient}
                    />
                )}

                {isEditAccountModel && (
                    <EditUserModel
                        isOpen={isEditAccountModel}
                        onClose={() => setIsEditAccountModel(false)}
                        currentUser={patient.user}
                        refreshUsers={refetchPatient}
                    />
                )}
            </Suspense>
        </>
    );
};

export default PatientActions;
