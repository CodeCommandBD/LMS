import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, placeholder, readOnly = false }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: placeholder || "Write something...",
        readOnly: readOnly,
        modules: {
          toolbar: readOnly
            ? false
            : [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
        },
      });

      quillRef.current.on("text-change", () => {
        if (onChange) {
          onChange(quillRef.current.root.innerHTML);
        }
      });

      // Set initial value
      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [readOnly, placeholder]); // Init only once usually

  // Update value if changed externally (be careful with loops)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Only update if significantly different to avoid cursor jumps
      // quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="rich-text-editor">
      <div
        ref={editorRef}
        style={{ minHeight: "150px" }}
        className="bg-white dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

export default RichTextEditor;
