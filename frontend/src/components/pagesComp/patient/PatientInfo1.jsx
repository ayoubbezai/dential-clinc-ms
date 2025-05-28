import React, { useState } from 'react';
import { FaStickyNote, FaRegStickyNote } from 'react-icons/fa';
import { Button } from '@/components/designSystem/button';
import { Link } from 'react-router-dom';

const PatientInfo1 = ({ patient, t }) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <div className="col-span-4 bg-white p-3 py-4 shadow-md rounded-lg">
      <h3 className='text-[#223354] font-bold text-xl'>{patient?.patient_name}</h3>

      <p className='text-sm ml-1'>{patient?.user?.email || t("patient_info1.no_account")}</p>

      <div className="flex relative flex-col justify-center gap-2 mt-6">
        <Button className="text-white"><Link to={`/messanger/${patient?.user?.id}`}>{t("patient_info1.send_message")}</Link></Button>
        <div className="relative w-full">
          <Button
            className={`text-white bg-supporting-1 w-full flex items-center justify-between px-4 transition-opacity duration-200 ${isNoteOpen ? 'opacity-75' : 'opacity-100'}`}
            onClick={() => setIsNoteOpen(!isNoteOpen)}
          >
            <span className="mx-auto">{isNoteOpen ? t("patient_info1.hide_note") : t("patient_info1.see_note")}</span>
            {isNoteOpen ? <FaStickyNote /> : <FaRegStickyNote />}
          </Button>
          {isNoteOpen && (
            <div className="ml-3 bg-blur-xs bg-white/90 absolute self-center text-center p-2 shadow-md z-50 rounded">
              <div className="bg-[#F5F5FD] p-2">
                <p className="text-xs">{patient?.notes || t("patient_info1.no_notes")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo1;
