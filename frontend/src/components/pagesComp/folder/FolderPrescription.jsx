import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import logo from "@/assets/logos/logo_1-removebg-preview.png";
import logoWhatsApp from '@/assets/logos/410201-PD391H-802.jpg';
import logoLocation from '@/assets/logos/25530.jpg';

const FolderPrescription = ({ patient }) => {
    const [showModal, setShowModal] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [date, setDate] = useState("");
    const [medicines, setMedicines] = useState([
        { name: "", dose: "", frequency: "" },
    ]);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", dose: "", frequency: "" }]);
    };

    const removeMedicine = (index) => {
        if (medicines.length === 1) return;
        const updated = medicines.filter((_, i) => i !== index);
        setMedicines(updated);
    };
    const handleGenerate = (e) => {
        e.preventDefault();

        try {
            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
            const pageWidth = doc.internal.pageSize.getWidth();
            const centerX = pageWidth / 2;

            const blue = [0, 105, 192];
            const green = [0, 166, 156];
            const darkText = [33, 33, 33];

            const displayDate = date || new Date().toLocaleDateString('fr-FR');
            const patientName = patient?.patient_name || '';
            const [lastName = '', firstName = ''] = patientName.split(' ');
            const patientAge = patient?.age ? `${patient.age} ans` : '____ ans';

            const addText = (text, x, y, options = {}) => {
                doc.text(text || '________', x, y, options);
            };

            const topY = 10;

            // 🏷️ Gradient background behind header title
            const gradientBoxWidth = pageWidth / 2;
            const gradientBoxHeight = 7;
            const gradientBoxX = centerX - gradientBoxWidth / 2;
            const gradientBoxY = topY - 4;
            const gradientSteps = 100; // smoother gradient

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

            // Draw rounded border (optional - not filled)
            doc.setDrawColor(blue[0], blue[1], blue[2]);
            // doc.roundedRect(gradientBoxX, gradientBoxY, gradientBoxWidth, gradientBoxHeight, 1.5, 1.5, 'S');

            // 🏷️ HEADER TITLE (Centered)
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            addText("Cabinet Dentaire Dr Chebaani Rima", centerX, topY, { align: "center" });

            // 👩‍⚕️ LEFT BLOCK
            const leftBlockTop = topY + 13;
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(...green);
            addText("Dr Chebaani Rima", 20, leftBlockTop);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...darkText);
            addText("Docteur en médecine dentaire", 14, leftBlockTop + 5);

            // 🖼️ LOGO (centered, slightly higher)
            const logoWidth = 20;
            const logoHeight = 20;
            const logoX = (pageWidth - logoWidth) / 2;
            const logoY = topY + 5;

            doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

            // 📄 RIGHT BLOCK
            doc.setFontSize(9);
            doc.setTextColor(...darkText);
            const rightStartY = leftBlockTop - 4;
            addText(`batna le: ${displayDate}`, 93, rightStartY);
            addText(`nom: ${lastName}`, 93, rightStartY + 5);
            addText(`prénom: ${firstName}`, 93, rightStartY + 9);
            addText(`âge: ${patientAge}`, 93, rightStartY + 13);

            // Divider below header
            doc.setDrawColor(...blue);
            doc.setLineWidth(0.4);
            doc.line(10, rightStartY + 18, 138, rightStartY + 18);

            // 📝 Title: ORDONNANCE
            doc.setFont("helvetica", "bold");
            doc.setFontSize(13);
            doc.setTextColor(0, 0, 0);
            addText("ORDONNANCE", centerX, rightStartY + 26, { align: "center" });

            // 🧾 Table Header
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.setFillColor(245, 248, 250);
            const tableY = rightStartY + 33;
            doc.rect(15, tableY, 118, 7, 'F');
            addText("MÉDICAMENT", 18, tableY + 5);
            addText("DOSAGE", 70, tableY + 5);
            addText("POSOLOGIE", 115, tableY + 5);

            // Table Body
            let currentY = tableY + 10;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(...darkText);

            medicines.forEach((med) => {
                addText(med.name || '________', 18, currentY);
                addText(med.dose || '________', 70, currentY);
                addText(med.frequency ? `${med.frequency} x/jour` : '____ x/jour', 115, currentY);
                currentY += 7;
            });

            // Footer Divider
            doc.setDrawColor(...blue);
            doc.line(10, 195, 138, 195);

            // 📍 Footer icons (use images instead of emojis)
            const footerY = 200;
            const iconSize = 6;

            doc.addImage(logoLocation, 'PNG', 15, footerY - 4, iconSize, iconSize);
            doc.setFontSize(8);
            addText("Batna, Algérie", 23, footerY);

            doc.addImage(logoWhatsApp, 'PNG', 90, footerY - 4, iconSize, iconSize);
            doc.setFontSize(8);
            addText("+213 666 123 456", 98, footerY);

            // Generate PDF
            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setPrescriptions((prev) => [...prev, {
                patient: patientName,
                date: displayDate,
                pdfUrl,
            }]);

            setMedicines([{ name: "", dose: "", frequency: "" }]);
            setShowModal(false);
        } catch (err) {
            console.error("PDF Generation Error:", err);
            alert("Une erreur est survenue lors de la génération du PDF.");
        }
    };




    return (
        <div className="col-span-4 bg-white p-6 shadow-sm rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Prescription Details</h3>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Prescription
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white">
                            <h4 className="text-2xl font-bold">New Prescription</h4>
                            <p className="text-blue-100">Create a prescription for {patient?.patient_name}</p>
                        </div>

                        <form onSubmit={handleGenerate} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Patient info */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                                    <input
                                        type="text"
                                        value={patient?.patient_name}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Age</label>
                                    <input
                                        type="text"
                                        value={patient?.age}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        value={patient?.phone}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none"
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
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add Medicine
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {medicines.map((med, i) => (
                                        <div key={i} className="grid grid-cols-12 gap-3 items-center">
                                            <div className="col-span-5">
                                                <input
                                                    type="text"
                                                    placeholder="Medicine Name"
                                                    value={med.name}
                                                    onChange={(e) => handleMedicineChange(i, "name", e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    placeholder="Dose (e.g., 500mg)"
                                                    value={med.dose}
                                                    onChange={(e) => handleMedicineChange(i, "dose", e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    placeholder="Times/Day"
                                                    value={med.frequency}
                                                    onChange={(e) => handleMedicineChange(i, "frequency", e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedicine(i)}
                                                    className="text-red-500 hover:text-red-700 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full"
                                                    title="Remove medicine"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Generate PDF
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Prescription List */}
            {prescriptions.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Saved Prescriptions</h4>
                    <div className="space-y-3">
                        {prescriptions.map((presc, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-gray-800">{presc.patient}</p>
                                    <p className="text-sm text-gray-500">{presc.date}</p>
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href={presc.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View
                                    </a>
                                    <a
                                        href={presc.pdfUrl}
                                        download={`Prescription_${presc.patient}_${presc.date}.pdf`}
                                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FolderPrescription;