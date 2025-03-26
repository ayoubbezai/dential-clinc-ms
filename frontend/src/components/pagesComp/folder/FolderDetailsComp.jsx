import React from "react";

const FolderDetailsComp = ({ folderDetails }) => {
    return (
        <div className="col-span-6 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b">
                <h3 className="text-[#223354] font-bold text-lg">{folderDetails?.folder_name || "N/A"}</h3>
                <p className={`text-xs font-medium px-3 py-1 rounded-md ${folderDetails?.status === "working_on_it" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                    {folderDetails?.status || "Unknown"}
                </p>
            </div>

            {/* Visits List */}
            <div className="mt-4 max-h-52 overflow-y-auto space-y-3">
                {folderDetails?.visits?.length > 0 ? (
                    folderDetails.visits.map((folder, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                        >
                            <p className="text-gray-900 font-semibold">
                                Tooth No.: <span className="text-[#223354] font-normal">{folder?.dent || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                Reason: <span className="text-[#223354] font-normal">{folder?.reason_of_visit || "N/A"}</span>
                            </p>
                            <p className="text-gray-900 font-semibold">
                                Treatment: <span className="text-[#223354] font-normal">{folder?.treatment_details || "N/A"}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center bg-gray-100 p-3 rounded-md">No tooth details available.</p>
                )}
            </div>
        </div>
    );
};

export default FolderDetailsComp;
