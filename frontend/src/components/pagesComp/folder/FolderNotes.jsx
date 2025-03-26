import React from "react";

const FolderNotes = ({ folderNotes }) => {
    return (
        <div className="col-span-6 bg-white p-5 shadow-md rounded-lg border border-gray-200 text-sm">
            {/* Title */}
            <h3 className="text-[#223354] font-bold text-lg pb-2 border-b mb-3">Notes</h3>
            

            {/* Notes List */}
            <div className="max-h-60 overflow-y-auto space-y-3">
                {folderNotes?.length > 0 ? (
                    folderNotes.map((note, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#F0F8FA] rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50"
                        >
                            <p className="text-gray-800 font-semibold">
                                Title: <span className="text-[#223354] font-normal">{note?.title || "Untitled"}</span>
                            </p>
                            <p className="text-gray-800 font-medium">
                                Content: <span className="text-gray-600 font-normal">{note?.content || "No content available"}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No notes available.</p>
                )}
            </div>
        </div>
    );
};

export default FolderNotes;
