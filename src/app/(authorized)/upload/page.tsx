"use client";
import SuccessToast from "@/components/modals/successToast";
import React, { useState, useRef } from "react";

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    setUploadMessage(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please upload a .csv file.");
      return;
    }

    setLoading(true);
    setUploadMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/schedules/uploadcsv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        setUploadMessage("File uploaded successfully.");
        setFile(null);
        SuccessToast("Accepted", `File uploaded successfully.`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        console.error("File upload failed");
        setUploadMessage("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadMessage("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-[100%]">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
        ref={fileInputRef}
      />
      {file && (
        <div className="mb-4 text-gray-700 flex flex-col items-center">
          <span>Selected file: {file.name}</span>
          <button
            onClick={handleRemoveFile}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove File
          </button>
        </div>
      )}
      {uploadMessage && (
        <div className="mb-4 text-red-500">{uploadMessage}</div>
      )}

      <button
        onClick={handleUpload}
        className="px-4 py-2 w-[116px] bg-[#05A5FB] text-white rounded hover:bg-[#50C2FF]"
        disabled={!file}
      >
        {loading ? (
          <div className="ml-[34px] w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Upload CSV"
        )}
      </button>
    </div>
  );
};

export default Page;
