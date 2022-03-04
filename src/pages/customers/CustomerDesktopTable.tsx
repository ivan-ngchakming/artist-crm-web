import { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
  Checkbox,
  Menu,
  MenuItem,
  styled,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMutation, useQueryClient } from "react-query";
import { deleteCustomer as deleteCustomerQuery } from "../../queries";
import { Customer } from "../../types";
import { getCustomerFullName, formatDate } from "../../utils";
import Pagination, { PaginationProps } from "./Pagination";

type TableRowProps = MuiTableRowProps & { menuopened?: boolean };

const TableCell = styled(MuiTableCell)({
  borderBottom: "none",
});

const TableRow = styled(MuiTableRow)<TableRowProps>(({ menuopened }) => ({
  "& .MuiIconButton-root": {
    display: menuopened ? "inline-flex" : "none",
  },
  "&:hover .MuiIconButton-root": {
    display: "inline-flex",
  },
}));

const CustomersDesktopTable = ({
  customers,
  paginationProps,
  color,
}: {
  customers: Customer[];
  paginationProps: PaginationProps;
  color: string;
}) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: deleteCustomer } = useMutation(
    ["deleteCustomer"],
    deleteCustomerQuery,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listCustomers");
      },
    }
  );

  const handleDeleteCustomer = (id: number) => {
    deleteCustomer(id);
    handleClose();
  };

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
                const open =
                  !!anchorEl && anchorEl.id === `table-row-menu-button-${id}`;

                return (
                  <>
                    <TableRow key={id} hover menuopened={open}>
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
                      <TableCell sx={{ width: 56, px: 1 }}>
                        <IconButton
                          id={`table-row-menu-button-${id}`}
                          aria-controls={
                            open ? `table-row-menu-${id}` : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          disableRipple
                          onClick={handleOpenMenu}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <Menu
                      id={`table-row-menu-${id}`}
                      key={`table-row-menu-${id}`}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "mobile-menu-button",
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem dense onClick={() => handleDeleteCustomer(id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
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
