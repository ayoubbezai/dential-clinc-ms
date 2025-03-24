import usePatient from '@/hooks/other/usePatient';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Table} from '@/components/designSystem/table';

import PatientInfo1 from '@/components/pagesComp/patient/PatientInfo1';
import PatientInfo2 from '@/components/pagesComp/patient/PatientInfo2';
import FolderTableHeader from '@/components/pagesComp/patient/FolderTableHeader';
import FolderTableHead from '@/components/pagesComp/patient/FolderTableHead';
import FolderTableBody from '@/components/pagesComp/patient/FolderTableBody';
import FolderGridTable from '@/components/pagesComp/patient/FolderGridTable';
import FolderTableFooter from '@/components/pagesComp/patient/FolderTableFooter';
const PatientDetails = () => {
  const { id } = useParams();
  const { patient, loading, folders, refetchPatient } = usePatient(id);
  const [view, setView] = useState("list");

  return (

      <div className="w-full px-8 bg-background py-5 text-secondary">
        <p className="flex items-center gap-2 text-gray-700">
          <Link to="/patients_list" className="text-blue-600 font-semibold">Patients</Link>
          <HiArrowNarrowRight className="text-gray-500 mt-1" />
          <span className="text-gray-500">{patient?.patient_name}</span>
        </p>

        <div className="grid grid-cols-12 gap-4 my-4">
          <PatientInfo1 patient={patient}/>
          <PatientInfo2 patient={patient} refetchPatient={refetchPatient} />
          <div className="col-span-12 relative bg-white p-3 px-4 shadow-md rounded-lg">
            <FolderTableHeader view={view} setView={setView} id={id}/>

            <div className="pt-4">
              {view === "list" ? (
                <Table>
                <FolderTableHead />
                <FolderTableBody loading={loading} folders={folders}/>
                </Table>
            ) : <FolderGridTable folders={folders} />
              }
              <FolderTableFooter />
            </div>
          </div>
        </div>
      </div>


  );
};

export default PatientDetails;
