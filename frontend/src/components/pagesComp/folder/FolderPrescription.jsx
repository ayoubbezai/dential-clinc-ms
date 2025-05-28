import { useState } from "react";
import { jsPDF } from "jspdf";

const FolderPrescription = () => {
    const [showModal, setShowModal] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [form, setForm] = useState({ patient: "", date: "", meds: "" });

    const handleGenerate = (e) => {
        e.preventDefault();

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a5",
        });

        doc.setFontSize(16);
        doc.text("Prescription", 10, 20);
        doc.setFontSize(12);
        doc.text(`Patient: ${form.patient}`, 10, 30);
        doc.text(`Date: ${form.date}`, 10, 40);
        doc.text("Medication:", 10, 50);

        const medsArray = form.meds.split("\n");
        medsArray.forEach((med, index) => {
            doc.text(`- ${med}`, 15, 60 + index * 10);
        });

        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);

        setPrescriptions((prev) => [...prev, { ...form, pdfUrl: url }]);
        setForm({ patient: "", date: "", meds: "" });
        setShowModal(false);
    };

    return (
        <div className="col-span-4 bg-white p-3 pb-5 shadow-sm rounded-md border border-gray-200 text-sm">
            <h3 className="text-[#223354] font-bold text-lg pt-1 pb-3 border-b mb-3">
                Prescription Details
            </h3>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Prescription
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h4 className="text-lg font-bold mb-4">New Prescription</h4>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Patient Name"
                                value={form.patient}
                                onChange={(e) => setForm({ ...form, patient: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <textarea
                                placeholder="Medications (one per line)"
                                value={form.meds}
                                onChange={(e) => setForm({ ...form, meds: e.target.value })}
                                rows={4}
                                className="w-full border px-3 py-2 rounded"
                                required
                            ></textarea>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Prescription List */}
            {prescriptions.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Saved Prescriptions:</h4>
                    <ul className="space-y-2">
                        {prescriptions.map((presc, index) => (
                            <li key={index} className="border rounded p-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{presc.patient}</p>
                                        <p className="text-xs text-gray-500">{presc.date}</p>
                                    </div>
                                    <a
                                        href={presc.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View PDF
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FolderPrescription;
