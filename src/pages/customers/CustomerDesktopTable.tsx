import {
  Table,
  TableBody,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Checkbox,
  styled,
} from "@mui/material";
import { Customer } from "../../types";
import { getCustomerFullName } from "../../utils";

const TableCell = styled(MuiTableCell)({
  borderBottom: "none",
});

const CustomersDesktopTable = ({ customers }: { customers: Customer[] }) => {
  return (
    <TableContainer>
      <Table aria-label="customers table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Instagram</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Updated</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.map((customer) => {
            const { id, email, instagram } = customer;
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
                <TableCell align="left">Active</TableCell>
                <TableCell align="left">-</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomersDesktopTable;
