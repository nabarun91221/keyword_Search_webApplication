"use client";
import Dropzone from "@/components/DropZone";
import { useState } from "react";
import { Searchbar } from "@/components/searchbar";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import StickyHeadTable from "@/components/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "@/components/loading";
export default function Home() {
  const [files, setFiles] = useState([]);
  const [processedData, setProcessData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const [paraToggle, setParatoggle] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const upload_process_files = async (formData) => {
    try {
      setisLoading(true);
      await fetch("http://localhost:8080/api/serverprocess", {
        method: "POST",
        body: formData,
        Headers: ["Access-Control-Allow-Origin : http://localhost:3000"],
      })
        .then((response) => response.json())
        .then((data) => {
          // data = JSON.parse(data);
          setTableData([]);
          setProcessData(() => {
            return data;
          });

          if (data.length == files.length && files.length) {
            noty_handleClick(
              "All files processed and receive response successfully"
            );
          } else if (data.length < files.length && data.length) {
            noty_handleClick(
              "Unable to process some files. File type must be .pdf, .xlsx and docx"
            );
          } else {
            noty_handleClick(
              "Unable to process files. Files must be type of .pdf, .xlsx and docx "
            );
          }
        });
    } catch (error) {
      // TypeError: Failed to fetch
      noty_handleClick(
        "There was an error unable process. Usually this happens beacuse of the file content"
      );
      setTimeout(() => {
        noty_handleClick("Ensure uploaded files name has no spaces");
      }, 2500);
    }
    setSearchKey("");
    setisLoading(false);
  };
  //notify chip setup
  const noty_handleClick = (msg) => {
    toast(msg, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dropzone
        className="p-16 mt-10 border border-neutral-200"
        files={files}
        setFiles={setFiles}
        upload_process_files={upload_process_files}
        noty_handleClick={noty_handleClick}
        setProcessData={setProcessData}
      ></Dropzone>
      <div className="lower-container">
        <div className="container">
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            {processedData.length > 0 &&
              processedData.map((data, index) => {
                return (
                  <Chip
                    label={data.filename}
                    variant="outlined"
                    sx={{ color: "#e0e0e0", backgroundColor: "#525150" }}
                    key={data.filename}
                  />
                );
              })}
          </Stack>
        </div>
        <Searchbar
          processedData={processedData}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          setTableData={setTableData}
          paraToggle={paraToggle}
          setParatoggle={setParatoggle}
          noty_handleClick={noty_handleClick}
          setisLoading={setisLoading}
          isLoading={isLoading}
        ></Searchbar>

        <StickyHeadTable tableData={tableData}></StickyHeadTable>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
      <Loading isLoading={isLoading}></Loading>
    </main>
  );
}
