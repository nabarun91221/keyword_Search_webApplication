"use client";
import Dropzone from "@/components/DropZone";
import { useState } from "react";
import { Searchbar } from "@/components/searchbar";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import StickyHeadTable from "@/components/table";
export default function Home() {
  const [files, setFiles] = useState([]);
  const [processedData, setProcessData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const upload_process_files = (formData) => {
    fetch("http://localhost:8080/api/serverprocess", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // data = JSON.parse(data);
        setTableData([]);
        setProcessData(() => {
          return data;
        });
        console.log(data);
      });
  };
  // console.log(processedData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dropzone
        className="p-16 mt-10 border border-neutral-200"
        files={files}
        setFiles={setFiles}
        upload_process_files={upload_process_files}
      ></Dropzone>
      <div className="lower-container">
        <div className="container">
          <Stack direction="row" spacing={1}>
            {processedData.length > 0 &&
              processedData.map((data) => {
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
        ></Searchbar>
        <StickyHeadTable tableData={tableData}></StickyHeadTable>
      </div>
    </main>
  );
}
