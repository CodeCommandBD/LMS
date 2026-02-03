import React from "react";

const PDFViewer = ({ url, title }) => {
  if (!url) {
    return (
      <div className="p-8 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500">PDF not available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow">
      {title && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Download PDF
          </a>
        </div>
      )}
      <div className="flex-1 w-full h-[600px]">
        <iframe
          src={`${url}#toolbar=0`}
          title={title || "PDF Viewer"}
          className="w-full h-full rounded-b-lg"
        >
          <p>
            Your browser does not support PDFs.
            <a href={url}>Download the PDF</a>.
          </p>
        </iframe>
      </div>
    </div>
  );
};

export default PDFViewer;
