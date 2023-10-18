import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
// import CancelIcon from "@mui/icons-material/Cancel";

const columns = [
  { id: "filename", label: "File Name", minWidth: 200 },
  { id: "content", label: "Matching Stremline", minWidth: 500 },
];

export default function StickyHeadTable({
  tableData,
  searchKeyArr,
  setSearchKeyArr,
  searchKeyChipDelete,
}) {
  const [isLoading, setisLoading] = useState(false);
  if (tableData.length > 0) {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Stack direction="row" spacing={1} sx={{ p: 1 }}>
          {searchKeyArr.length > 0 &&
            searchKeyArr.map((searchKey, index) => {
              return (
                <Chip
                  label={searchKey}
                  variant="outlined"
                  // sx={{ color: "#e0e0e0", backgroundColor: "#525150" }}
                  key={searchKey + index}
                  // deleteIcon={
                  //   <CancelIcon
                  //     onMouseDown={(e) => {
                  //       e.stopPropagation();
                  //       e.preventDefault();
                  //     }}
                  //   ></CancelIcon>
                  // }
                  // // onDelete={async (e) => {
                  // //   await searchKeyChipDelete(searchKey);
                  // // }}
                />
              );
            })}
        </Stack>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#545454", color: "whitesmoke" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={`${data.filename}_${String(index)}`}
                  >
                    {columns.map((column) => {
                      let value = data[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            backgroundColor: "gray",
                            color: "whitesmoke",
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  } else if (isLoading == true) {
    return (
      <>
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={"100%"}
          height={50}
        />
        <Skeleton
          sx={{ bgcolor: "grey.900", marginTop: 1 }}
          variant="rectangular"
          width={"100%"}
          height={30}
        />
        <Skeleton
          sx={{ bgcolor: "grey.900", marginTop: 1 }}
          variant="rectangular"
          width={"100%"}
          height={30}
        />
      </>
    );
  } else {
    return <></>;
  }
}
