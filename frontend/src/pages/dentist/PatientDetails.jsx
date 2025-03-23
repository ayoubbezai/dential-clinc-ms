import usePatient from '@/hooks/other/usePatient';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/designSystem/button';
import { FaStickyNote, FaRegStickyNote, FaUserInjured, FaChevronRight } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/designSystem/table';
import { Badge } from '@/components/designSystem/badge';
import FolderIcon from "../../assets/icons/folder.svg"
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
const PatientDetails = () => {
  const { id } = useParams();
  const { error, patient, loading, folders } = usePatient(id);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  console.log(patient);
  console.log("folders", folders);
  console.log("folders", folders?.data?.folders);
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
        <div className="col-span-4 bg-white p-3 py-4 shadow-md rounded-lg py-5 ">
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

        <div className="col-span-8 bg-white px-3 pt-4 pb-5 space-y-1 shadow-md rounded-lg">
          <div className='w-5/6 bg-white mx-auto px-4'>
            <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-4'>
              <SearchInTable search={search} setSearch={setSearch} />
              <div className='flex flex-wrap items-center gap-2'>
                <SelectGender gender={gender} setGender={setGender} />
                <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
              </div>
            </div>
          <h1 className="text-xl font-semibold text-[#1E1E1E]  mb-2">Patient Details</h1>
          <hr className='mb-4 text-gray-400' />
          <div className="grid grid-cols-2 pl-2 gap-4 text-[#4A4A4A] text-sm">
            <p><strong className="text-[#1E1E1E]">Full Name:</strong> {patient?.patient_name || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Phone:</strong> {patient?.phone || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Age:</strong> {patient?.age || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Gender:</strong> {patient?.gender || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Patient ID:</strong> {patient?.id || "N/A"}</p>
            <p><strong className="text-[#1E1E1E]">Diseases: </strong>{patient?.diseases || "No known diseases"}</p>
          </div>
          </div>

        </div>
        {/* row two */}
        <div className="col-span-12 bg-white p-3 shadow-md rounded-lg">


          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Folder Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ACTIONS</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {folders?.data?.folders?.map((folder, index) => (
                <TableRow key={index}>
                  <TableCell className={"flex items-center gap-3"}><img src={FolderIcon} alt="folder" className='w-10 h-8' /><span>{folder.folder_name}</span></TableCell>
                  <TableCell>${folder.price}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {folder.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button className="cursor-pointer"  disabled={loading}
                      >
                        <img src={EditIcon} alt="edit" className="w-5" />
                      </button>
                      <button className="cursor-pointer" disabled={loading}>
                        <img src={DeleteIcon} alt="delete" className="w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;
