import React, { useState, useEffect } from "react";
import Model from "../other/Model";
import { jsPDF } from "jspdf";
import logo from "@/assets/logos/logo_1-removebg-preview.png";
import logoWhatsApp from '@/assets/logos/410201-PD391H-802.jpg';
import logoLocation from '@/assets/logos/25530.jpg';
import { attachmentService } from "@/services/dentist/attachmentService";

const AddPrescriptionModel = ({ isOpen, onClose, patient, setPrescriptions, folderId }) => {
    const [date, setDate] = useState("");
    const [medicines, setMedicines] = useState([{ name: "", dose: "", frequency: "" }]);
    const [patientInfo, setPatientInfo] = useState({
        lastName: patient?.patient_name?.split(' ')[0] || '',
        firstName: patient?.patient_name?.split(' ')[1] || '',
        age: patient?.age ? `${patient.age} ans` : '____ ans'
    });

    // New state for prescription title
    const [prescriptionTitle, setPrescriptionTitle] = useState(`Prescription - ${patient?.patient_name || ''}`);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const handlePatientInfoChange = (field, value) => {
        setPatientInfo(prev => ({ ...prev, [field]: value }));
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", dose: "", frequency: "" }]);
    };

    const removeMedicine = (index) => {
        if (medicines.length === 1) return;
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleGenerate = async (e) => {
        e.preventDefault();

        try {
            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
            const pageWidth = doc.internal.pageSize.getWidth();
            const centerX = pageWidth / 2;

            const blue = [0, 105, 192];
            const green = [0, 166, 156];
            const darkText = [33, 33, 33];

            const displayDate = date || new Date().toLocaleDateString('fr-FR');
            const lastName = patientInfo.lastName || '________';
            const firstName = patientInfo.firstName || '________';
            const patientAge = patientInfo.age || '____ ans';

            const addText = (text, x, y, options = {}) => {
                doc.text(text || '________', x, y, options);
            };

            // Header styling and content
            const topY = 10;
            const gradientBoxWidth = pageWidth / 2;
            const gradientBoxHeight = 7;
            const gradientBoxX = centerX - gradientBoxWidth / 2;
            const gradientBoxY = topY - 4;
            const gradientSteps = 100;

            for (let i = 0; i < gradientSteps; i++) {
                const ratio = i / gradientSteps;
                const r = Math.round(blue[0] * (1 - ratio) + green[0] * ratio);
                const g = Math.round(blue[1] * (1 - ratio) + green[1] * ratio);
                const b = Math.round(blue[2] * (1 - ratio) + green[2] * ratio);
                const stepWidth = gradientBoxWidth / gradientSteps;
                const stepX = gradientBoxX + i * stepWidth;
                doc.setFillColor(r, g, b);
                doc.rect(stepX, gradientBoxY, stepWidth + 0.2, gradientBoxHeight, 'F');
            }

            doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(255, 255, 255);
            addText("Cabinet Dentaire Dr Chebaani Rima", centerX, topY, { align: "center" });

            const leftBlockTop = topY + 13;
            doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(...green);
            addText("Dr Chebaani Rima", 20, leftBlockTop);

            doc.setFont("helvetica", "normal").setTextColor(...darkText);
            addText("Docteur en médecine dentaire", 14, leftBlockTop + 5);

            doc.addImage(logo, 'PNG', (pageWidth - 20) / 2, topY + 5, 20, 20);

            const rightStartY = leftBlockTop - 4;
            addText(`Batna le: ${displayDate}`, 93, rightStartY);
            addText(`Nom: ${lastName}`, 93, rightStartY + 5);
            addText(`Prénom: ${firstName}`, 93, rightStartY + 9);
            addText(`Âge: ${patientAge}`, 93, rightStartY + 13);

            doc.setDrawColor(...blue).setLineWidth(0.4).line(10, rightStartY + 18, 138, rightStartY + 18);

            doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(0, 0, 0);
            addText("ORDONNANCE", centerX, rightStartY + 26, { align: "center" });

            // Table
            doc.setFontSize(9).setFont("helvetica", "bold").setFillColor(245, 248, 250);
            const tableY = rightStartY + 33;
            doc.rect(15, tableY, 118, 7, 'F');
            addText("MÉDICAMENT", 18, tableY + 5);
            addText("DOSAGE", 70, tableY + 5);
            addText("POSOLOGIE", 115, tableY + 5);

            let currentY = tableY + 10;
            doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...darkText);

            medicines.forEach((med) => {
                addText(med.name || '________', 18, currentY);
                addText(med.dose || '________', 70, currentY);
                addText(med.frequency ? `${med.frequency} x/jour` : '____ x/jour', 115, currentY);
                currentY += 7;
            });

            doc.setDrawColor(...blue).line(10, 195, 138, 195);
            const footerY = 200;
            const iconSize = 6;

            doc.addImage(logoLocation, 'PNG', 15, footerY - 4, iconSize, iconSize);
            doc.setFontSize(8);
            addText("Hamla 3 à côté de Moffok Shopping - Batna", 23, footerY);

            doc.addImage(logoWhatsApp, 'PNG', 90, footerY - 4, iconSize, iconSize);
            addText("+213 663 328 133", 98, footerY);

            // Convert PDF to blob
            const pdfBlob = doc.output("blob");

            // Upload to backend
            const formData = new FormData();
            formData.append("file", pdfBlob, `prescription-${prescriptionTitle}-${date}.pdf`);
            formData.append("title", prescriptionTitle);
            formData.append("type", "prescription");

            await attachmentService.storeAttachment(folderId, formData);



            setMedicines([{ name: "", dose: "", frequency: "" }]);
            onClose();
        } catch (err) {
            console.error("PDF Generation or Upload Error:", err);
            alert("Erreur lors de la génération ou de l'envoi de l'ordonnance.");
        }
    };

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-gray-500/20 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white">
                        <h4 className="text-2xl font-bold">New Prescription</h4>
                        <p className="text-blue-100">Create a prescription for {patient?.patient_name}</p>
                    </div>

                    <form onSubmit={handleGenerate} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Prescription Title */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Prescription Title</label>
                                <input
                                    type="text"
                                    value={prescriptionTitle}
                                    onChange={(e) => setPrescriptionTitle(e.target.value)}
                                    placeholder="Enter prescription title"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            {/* Patient info */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value={patientInfo.lastName}
                                    onChange={(e) => handlePatientInfoChange('lastName', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value={patientInfo.firstName}
                                    onChange={(e) => handlePatientInfoChange('firstName', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="text"
                                    value={patientInfo.age}
                                    onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Medicines */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="font-semibold text-lg text-gray-800">Medications</h5>
                                <button
                                    type="button"
                                    onClick={addMedicine}
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    + Add Medicine
                                </button>
                            </div>

                            {medicines.map((med, index) => (
                                <div key={index} className="grid grid-cols-12 gap-3 mb-3 items-center">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={med.name}
                                        onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                                        className="col-span-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dose"
                                        value={med.dose}
                                        onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                                        className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Frequency"
                                        value={med.frequency}
                                        onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                                        className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeMedicine(index)}
                                        className="col-span-1 text-red-600 font-bold text-xl"
                                        title="Remove Medicine"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-4 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Generate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Model>
    );
};

export default AddPrescriptionModel;
