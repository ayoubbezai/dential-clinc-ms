import AddPatientAccModel from '@/models/AddModels/AddPatientAccModel';
import EditPatientModel from '@/models/EditModels/EditPatientModel';
import EditUserModel from '@/models/EditModels/EditUserModel';
import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa';

const PatientActions = ({ patient, refetchPatient }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddAccountModel, setIsAddAccountModel] = useState(false)
    const [isEditAccountModel, setIsEditAccountModel] = useState(false)


    return (
        <>
            <div className="flex justify-between  items-center">
                <h3 className='text-[#223354] font-bold text-xl pb-3'>Patient Details</h3>


                <div className="relative mb-2">
                    <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaEllipsisH className="text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                            {patient?.user?.email ?
                                <button onClick={() => { setIsEditAccountModel(true); setMenuOpen(!menuOpen) }}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Edit Account
                                </button>
                                :
                                <button onClick={() => { setIsAddAccountModel(true); setMenuOpen(!menuOpen) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Add Account
                                </button>
                            }
                            <button onClick={() => { setIsEditModalOpen(true); setMenuOpen(!menuOpen) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                Edit Patient
                            </button>
                        </div>
                    )}
                </div>

            </div>
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
        </>
    )
}

export default PatientActions
