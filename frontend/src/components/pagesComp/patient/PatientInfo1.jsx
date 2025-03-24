import React, { useState } from 'react'
import { FaStickyNote, FaRegStickyNote} from 'react-icons/fa';
import { Button } from '@/components/designSystem/button';
const PatientInfo1 = ({ patient }) => {
      const [isNoteOpen, setIsNoteOpen] = useState(false);
      
    
  return (
          <div className="col-span-4 bg-white p-3 py-4 shadow-md rounded-lg">
            <h3 className='text-[#223354] font-bold text-xl'>{patient?.patient_name}</h3>

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
                      <p className=" text-xs">{patient?.notes || "No notes available"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  )
}

export default PatientInfo1
