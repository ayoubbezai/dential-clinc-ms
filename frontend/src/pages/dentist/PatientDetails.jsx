import usePatient from '@/hooks/other/usePatient';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/designSystem/button';
import { FaStickyNote, FaRegStickyNote, FaUserInjured, FaTh, FaList, FaPlus, FaEllipsisV, FaEllipsisH } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/designSystem/table';
import { Badge } from '@/components/designSystem/badge';
import FolderIcon from "../../assets/icons/folder2.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import SearchInTable from '@/components/small/SearchInTable';
import Sort from '@/components/small/Sort';
import Skeleton from 'react-loading-skeleton';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';
import AddFolderModel from '@/models/AddModels/AddFolderModel';

const PatientDetails = () => {
  const { id } = useParams();
  const { error, patient, loading, folders } = usePatient(id);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [view, setView] = useState("list");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>

      <div className="w-full px-8 bg-background py-5 text-secondary">
        <p className="flex items-center gap-2 text-gray-700">
          <Link to="/patients_list" className="text-blue-600 font-semibold">Patients</Link>
          <HiArrowNarrowRight className="text-gray-500 mt-1" />
          <span className="text-gray-500">{patient?.patient_name}</span>
        </p>

        <div className="grid grid-cols-12 gap-4 my-4">
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

          <div className="col-span-8 bg-white p-4 pb-6 shadow-md rounded-lg">
            <div className="flex justify-between  items-center">
              <h3 className='text-[#223354] font-bold text-xl pb-3'>Patient Details</h3>


              {/* Custom Three-Dot Menu */}
              <div className="relative mb-2">
                <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
                  <FaEllipsisH className="text-gray-500" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                    <button onClick={() => alert('Add Account Clicked')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Add Account
                    </button>
                    <button onClick={() => alert('Edit Clicked')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Edit
                    </button>
                  </div>
                )}
              </div>

            </div>

            <hr className='mb-5 text-gray-400' />
            <div className="grid grid-cols-2 gap-5 text-sm ">
              <p><strong>Full Name:</strong> {patient?.patient_name || "N/A"}</p>
              <p><strong>Phone:</strong> {patient?.phone || "N/A"}</p>
              <p><strong>Age:</strong> {patient?.age || "N/A"}</p>
              <p><strong>Gender:</strong> {patient?.gender || "N/A"}</p>
              <p><strong>Patient ID:</strong> {patient?.id || "N/A"}</p>
              <p><strong>Diseases:</strong> {patient?.diseases || "No known diseases"}</p>
            </div>
          </div>

          <div className="col-span-12 relative bg-white p-3 px-4 shadow-md rounded-lg">
            <div className='flex items-center justify-between pb-0 px-2'>
              <SearchInTable />
              <div className='flex items-center gap-2'>
                <div className="flex rounded-lg p-1 transition-all duration-300">
                  <button className={`px-4 py-2 rounded-l-lg transition-colors duration-300 ${view === "list" ? "bg-blue-600/90 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setView("list")}>
                    <FaList />
                  </button>
                  <button className={`px-4 py-2 rounded-r-lg transition-colors duration-300 ${view === "grid" ? "bg-blue-600/90 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setView("grid")}>
                    <FaTh />
                  </button>
                </div>
                <Button size={"sm"} className="bg-blue-600 text-white mx-2 rounded-lg" onClick={() => setIsAddFolderOpen(true)}><FaPlus size={12} /></Button>
              </div>
            </div>

            <div className="pt-4">
              {view === "list" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folder Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
                          <TableCell><Skeleton height={20} width={'40%'} /></TableCell>
                          <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
                          <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
                        </TableRow>
                      ))) : folders?.data?.folders?.map((folder, index) => (
                        <TableRow key={index} className={"bg-gray-50 hover:bg-gray-200"}>
                          <TableCell className="flex items-center gap-3">
                            <img src={FolderIcon} alt="folder" className='w-10 h-8' />
                            <span>{folder.folder_name}</span>
                          </TableCell>
                          <TableCell>${folder.price}</TableCell>
                          <TableCell><Badge variant="default">{folder.status}</Badge></TableCell>
                          <TableCell className="flex gap-2">
                            <button><img src={EditIcon} alt="edit" className="w-5" /></button>
                            <button><img src={DeleteIcon} alt="delete" className="w-5" /></button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : <div className="grid grid-cols-4 gap-4 px-2 pb-2 max-h-[350px] overflow-y-auto">
                {folders?.data?.folders?.map((folder, index) => (
                  <div key={index} className="p-4 shadow-md rounded-lg bg-gray-100 hover:bg-gray-200 text-center">
                    <img src={FolderIcon} alt="folder" className='w-12 h-12 mx-auto' />
                    <p className="font-semibold mt-2">{folder.folder_name}</p>
                    <p className="text-sm">${folder.price}</p>
                    <p className="text-xs text-gray-500">{folder.status}</p>
                  </div>
                ))}
              </div>
              }
              <div className='flex justify-between items-center pb-3 px-4 mt-4'>
                <PageChange />
                <PerPage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddFolderModel isOpen={isAddFolderOpen} onClose={() => setIsAddFolderOpen(false)} patientId={id} />

    </>
  );
};

export default PatientDetails;
