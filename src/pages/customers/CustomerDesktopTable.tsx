import {
  Table,
  TableBody,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Checkbox,
  styled,
  Box,
  Typography,
} from "@mui/material";
import { Customer } from "../../types";
import { getCustomerFullName, formatDate } from "../../utils";
import Pagination, { PaginationProps } from "./Pagination";

export type CusomterTableProps = {
  customers: Customer[];
  paginationProps: PaginationProps;
  color: string;
};

const TableCell = styled(MuiTableCell)({
  borderBottom: "none",
});

const CustomersDesktopTable = ({
  customers,
  paginationProps,
  color,
}: CusomterTableProps) => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table aria-label="customers table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 74 }}>
                <Checkbox />
              </TableCell>
              <TableCell align="left" sx={{ maxWidth: 74 }}>
                ID
              </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left" sx={{ minWidth: 200 }}>
                Email
              </TableCell>
              <TableCell align="left" sx={{ minWidth: 100 }}>
                Instagram
              </TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Updated</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => {
                const { id, email, instagram, status, updatedDate } = customer;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">
                      {getCustomerFullName(customer) || "-"}
                    </TableCell>
                    <TableCell align="left">{email || "-"}</TableCell>
                    <TableCell align="left">{instagram || "-"}</TableCell>
                    <TableCell align="left">{status}</TableCell>
                    <TableCell align="left">
                      {formatDate(updatedDate)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableCell colSpan={7}>
                <Typography textAlign="center" sx={{ color: color }}>
                  No customer found. Click + Create to create new customer.
                </Typography>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Pagination {...paginationProps} />
      </Box>
    </Box>
  );
};

export default CustomersDesktopTable;
