import React, { useEffect, useState } from 'react';
import { AppointmentService } from '@/services/shared/AppointmentsService';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import toast from 'react-hot-toast';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await AppointmentService.getAppointments();
        setAppointments(data.data);
      } catch (error) {
        toast.error('Failed to fetch appointments');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <>
      <div className='flex justify-between w-5/6 mt-10 mx-auto items-center'>
        <div className='flex flex-col'>
          <h3 className='text-[#223354] font-bold text-xl'>Appointments List</h3>
          <p className='text-[#223354] font-semibold mt-1'>This is the appointments list admin panel</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Folder Name</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={
                      appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800' // Completed status
                        : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800' // Pending status
                          : 'bg-red-100 text-red-800' // Cancelled or other status
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>{appointment.folder_name}</TableCell>
                <TableCell>{appointment.patient_name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="cursor-pointer">
                      <img src={EditIcon} alt="edit" className="w-5" />
                    </button>
                    <button className="cursor-pointer">
                      <img src={DeleteIcon} alt="delete" className="w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AppointmentList;