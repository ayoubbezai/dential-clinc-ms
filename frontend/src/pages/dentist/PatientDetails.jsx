import usePatient from '@/hooks/other/usePatient';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/designSystem/button';
import { FaStickyNote, FaRegStickyNote, FaUserInjured, FaChevronRight } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
const PatientDetails = () => {
  const { id } = useParams();
  const { error, patient, loading } = usePatient(id);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  console.log(patient);
  console.log(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-full px-8 bg-background py-5">
      <p className="flex items-center gap-2 text-gray-700">
        <FaUserInjured className="text-blue-600" /> {/* Patient icon */}
        <Link to="/patients_list" className="text-blue-600 font-semibold">Patients</Link>
        <HiArrowNarrowRight className="text-gray-500 mt-1" /> {/* Arrow icon */}
        <span className="text-gray-500">{patient?.patient_name}</span>
      </p>
      <div className="grid grid-cols-12 gap-4 my-4">
        {/* Patient Details Section */}
        <div className="col-span-4 bg-white p-3 shadow-md rounded-lg">
          <h1 className="text-xl font-semibold mb-[2px] text-[#1E1E1E]">{patient?.patient_name}</h1>
          <p className='text-sm ml-1'>{patient?.user?.email || "No account available"}</p>

          <div className="flex relative flex-col justify-center gap-2 mt-6">
            <Button className="text-white">Send Message</Button>
            <div className="relative w-full">
              <Button
                className={`text-white bg-supporting-1 w-full flex items-center justify-between px-4 transition-opacity duration-200 ${isNoteOpen ? 'opacity-75' : 'opacity-100'}`}
                onClick={() => setIsNoteOpen(!isNoteOpen)}
              >
                <span className="mx-auto">{isNoteOpen ? "Hide Note" : "See Note"}</span>
                {isNoteOpen ? <FaStickyNote /> : <FaRegStickyNote />}
              </Button>

              {isNoteOpen && (
                <div className="ml-3 bg-blur-xs bg-white/90 absolute self-center text-center p-2 shadow-md z-50 rounded">
                  <div className="bg-[#F5F5FD] p-2">
                    <p className="text-[#808080] text-xs">{patient?.notes || "No notes available"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-8 bg-white px-3 py-3 shadow-md rounded-lg">
          <h1 className="text-xl font-semibold text-[#1E1E1E]  mb-2">Patient Details</h1>
          <hr className='mb-2 bg-[#808080] text-[#808080] w-full h-[.8px]' />
          <div className="grid grid-cols-2 gap-4 text-[#4A4A4A] text-sm">
            <p><strong className="text-[#1E1E1E]">Phone:</strong> {patient?.phone || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Age:</strong> {patient?.age || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Gender:</strong> {patient?.gender || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Patient ID:</strong> {patient?.id || "N/A"}</p>
          </div>
          <div className="mt-4">
            <p><strong className="text-[#1E1E1E] text-sm">Diseases:</strong></p>
            <p className="text-[#808080] text-sm">{patient?.diseases || "No known diseases"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
