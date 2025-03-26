import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";

const pdfFiles = [
    { name: "Dental Report.pdf" },
    { name: "X-Ray Analysis.pdf" },
    { name: "Treatment Plan.pdf" },
    { name: "Invoice.pdf" },
    { name: "Treatment Plan.pdf" },
];

const FolderDocuments = () => {
    return (
        <div className="col-span-4 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title */}
            <h3 className="text-[#223354] font-bold text-lg pb-2 border-b mb-3">Documents</h3>

            {/* Documents List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {pdfFiles.map((pdf, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50 cursor-pointer"
                    >
                        <AiOutlineFilePdf className="text-red-600 text-2xl" />
                        <span className="text-[#223354] font-medium text-[13px] truncate">{pdf.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FolderDocuments;
