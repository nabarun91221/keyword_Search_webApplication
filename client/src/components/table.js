import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "filename", label: "File Name", minWidth: 170 },
  { id: "content", label: "Matching Stremline", minWidth: 500 },
];

export default function StickyHeadTable({ tableData }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
}
