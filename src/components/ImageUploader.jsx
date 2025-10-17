import React, { useState } from "react";
import axios from "axios";

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(res.data.url); // send uploaded URL back to parent
      setFile(null); // reset file input
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {/* Custom Choose File Button */}
      <label className="px-4 py-2 bg-gray-200 text-black rounded cursor-pointer hover:bg-gray-300">
        {file ? file.name : "Choose File"}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default ImageUploader;
