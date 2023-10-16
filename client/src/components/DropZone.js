"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Dropzone = ({
  className,
  files,
  setFiles,
  upload_process_files,
  noty_handleClick,
  setProcessData,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/plain": [".pdf", ".xls", ".xlsx", ".doc", ".docx"],
    },
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 6) {
      noty_handleClick(
        "uploading more than 6 files is not acceptable, this is to prevent memory leaks"
      );
    }
    if (files.length > 0 && files.length <= 6) {
      setProcessData([]);
      let formData = new FormData();
      files.forEach((file) => {
        formData.append(file.name, file);
      });
      upload_process_files(formData);
      removeAll();
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        <div className="flex gap-4">
          <h2 className="title text-3xl font-semibold">Preview</h2>
          <button
            type="button"
            onClick={() => {
              removeAll();
              if (files.length > 0) {
                noty_handleClick("all files removed");
              }
            }}
            className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
          >
            Remove all files
          </button>
        </div>

        {/* Accepted files */}
        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
          Accepted Files
        </h3>
        <ul className="mt-6 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {files.length > 0 &&
            files.map((file) => (
              <li
                key={file.name}
                className="relative h-20 w-16 rounded-md shadow-lg"
              >
                <Image
                  src="/doc.png"
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                  onClick={() => {
                    removeFile(file.name);
                    noty_handleClick(`${file.name} removed`);
                  }}
                >
                  <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                </button>
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
        </ul>
      </section>
      <input
        type="submit"
        value="PROCESS FILES"
        className="w-full mb-5 mt-20 h-10 border border-secondary-400 bg-secondary-400 rounded flex justify-center items-center transition-colors hover:bg-white hover:text-black"
      ></input>
    </form>
  );
};

export default Dropzone;
