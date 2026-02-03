import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  validateFileSize,
  validateFileType,
  formatFileSize,
} from "../../lib/utils";

const FileUploader = ({
  onFileSelect,
  accept,
  maxSizeMB = 10,
  label = "Upload File",
  description = "Drag and drop or click to browse",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    if (!validateFileSize(file, maxSizeMB)) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Optional: Validate type based on accept prop string (e.g., "image/*")
    // Simple check logic could be added here if needed

    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />

        {selectedFile ? (
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
            <div className="flex items-center overflow-hidden">
              <span className="text-2xl mr-3">📄</span>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-medium truncate text-gray-800 dark:text-white max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="cursor-pointer">
            <div className="text-4xl mb-2">☁️</div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {description}
            </p>
            <p className="text-xs text-gray-400">Max size: {maxSizeMB}MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
