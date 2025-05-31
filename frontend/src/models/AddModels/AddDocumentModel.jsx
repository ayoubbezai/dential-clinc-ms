import { attachmentService } from "@/services/dentist/attachmentService";
import React, {  useState } from "react";
import Model from "@/models/other/Model"

const AddDocumentModel = ({ isOpen, onClose, folderId }) => {
        const [file, setFile] = useState(null);
        const [title, setTitle] = useState("");
        async function handleStore() {
            if (!file || !title.trim()) {
                alert("Please select a file and enter a title.");
                return;
            }
    
            try {
                console.log("Uploading to folder:", folderId);
                console.log("Selected file:", file);
    
                const formData = new FormData();
                formData.append("file", file);
                formData.append("title", title);
                formData.append("type", "document");
    
                await attachmentService.storeAttachment(folderId, formData);
                alert("File uploaded successfully!");
                setFile(null);
                setTitle("");
    
                // Refresh document list after upload
    
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload file.");
            }
        }
    
  return (
      <Model isOpen={isOpen} onClose={onClose}>
          {/* File Upload */}
          <div className="mt-4">
              <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="mt-2 w-full p-2 border rounded-lg text-gray-700"
              />
              <button
                  onClick={handleStore}
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                  Upload Document
              </button>
          </div>
    </Model>
  )
}

export default AddDocumentModel
