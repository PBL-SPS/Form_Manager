import {
  Container,
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ContainerSpinner from "../components/ContainerSpinner";
import useGetResponses from "../hooks/useGetResponses";

const AllResponse = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let columns: any[] = [];
  let rows: any[] = [];

  const { formId } = useParams();
  const { data, isLoading } = useGetResponses(formId);

  if (data) {
    columns = !!data?.responseData[0]?.response_data
      ? Object.keys(JSON.parse(data?.responseData[0]?.response_data)).map(
          (key) => {
            return {
              id: key,
              label: key,
              minWidth: 300,
            };
          }
        )
      : [];

    if (data?.responseData) {
      data?.responseData.map((response: any) =>
        rows.push(JSON.parse(response?.response_data))
      );
    }
  }

  const handleChangePage = (event, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Box
        style={{
          marginTop: 20,
        }}
      >
        {}
        <Typography variant="h4">{data?.formData[0]?.title}</Typography>
        <Typography
          style={{
            marginTop: 10,
          }}
        >
          {data?.formData[0]?.description}
        </Typography>
      </Box>
      {columns.length > 0 && !isLoading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 7 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#525252",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : isLoading ? (
        <ContainerSpinner />
      ) : (
        <Typography sx={{ mt: 7 }} variant="h4">
          No Responses yet
        </Typography>
      )}
    </Container>
  );
};

export default AllResponse;
