import React, { useState } from 'react';
import Model from "@/models/other/Model";
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { selectClassName } from '@/constant/classNames';
import { Button } from '@/components/designSystem/button';
import { AppointmentService } from '@/services/shared/AppointmentsService';
import toast from 'react-hot-toast';

const statusOptions = ['pending', 'completed', 'cancelled', 'scheduled', 'rescheduled'];

const AddAppointmentModel = ({ isOpen, onClose, folder_id, fetchFolderAppointments, t }) => {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [tooth, setTooth] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleAdd(e) {
        e.preventDefault();
        if (!date || !status) {
            toast.error(t("add_appointment_model.error_required_fields"));
            return;
        }

        setLoading(true);
        try {
            const { data } = await AppointmentService.createAppointment(folder_id, date, title, tooth, content, status);

            if (data?.success) {
                toast.success(t("add_appointment_model.success_message"));
                fetchFolderAppointments(folder_id);
                onClose();
            } else {
                toast.error(data?.message || t("add_appointment_model.error_message"));
            }
        } catch (error) {
            toast.error(t("add_appointment_model.generic_error"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="p-4 py-2">
                <h2 className="text-xl font-semibold mb-4">{t("add_appointment_model.title")}</h2>

                <form className="flex flex-col" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <Label className="mb-2">{t("add_appointment_model.date_label")}</Label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={selectClassName} required />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_appointment_model.status_label")}</Label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${selectClassName} w-full`} required>
                            <option value="" disabled>{t("add_appointment_model.select_status")}</option>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {t(`folder_appointments.status_${option}`)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_appointment_model.tooth_label")}</Label>
                        <Input type="text" value={tooth} onChange={(e) => setTooth(e.target.value)} className={selectClassName} />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_appointment_model.title_label")}</Label>
                        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={selectClassName} />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">{t("add_appointment_model.content_label")}</Label>
                        <Input type="text" value={content} onChange={(e) => setContent(e.target.value)} className={selectClassName} />
                    </div>

                    <Button
                        type="submit"
                        className={`mt-6 px-4 py-3 text-white w-1/2 mx-auto bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? t("add_appointment_model.submitting") : t("add_appointment_model.submit")}
                    </Button>
                </form>
            </div>
        </Model>
    );
};

export default AddAppointmentModel;
