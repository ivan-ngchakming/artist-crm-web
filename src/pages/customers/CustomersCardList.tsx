import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Customer } from "../../types";
import { getCustomerFullName, formatDate } from "../../utils";
import Pagination, { PaginationProps } from "./Pagination";

const CustomersCardList = ({
  customers,
  paginationProps,
  color,
}: {
  customers: Customer[];
  paginationProps: PaginationProps;
  color: string;
}) => {
  if (customers.length === 0)
    return (
      <Typography textAlign="center" sx={{ color: color }}>
        No customer found. Click{" "}
        <MoreHorizIcon sx={{ position: "relative", top: 6 }} /> at the top app
        bar to create new customer.
      </Typography>
    );
  return (
    <Box pb={6}>
      <Box display="flex" justifyContent="center">
        <Pagination {...paginationProps} />
      </Box>

      {customers.map((customer) => {
        const { id, email, instagram, status, updatedDate } = customer;
        return (
          <Box key={id} m={2}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4">
                    {getCustomerFullName(customer) || "-"}
                  </Typography>
                  <Typography>{email || "-"}</Typography>
                  <Typography>{instagram ? "@" + instagram : "-"}</Typography>
                  <Typography variant="body2">Status: {status}</Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography textAlign="right" variant="caption">
                      Last Updated: {formatDate(updatedDate)}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        );
      })}

      <Box display="flex" justifyContent="center">
        <Pagination {...paginationProps} />
      </Box>
    </Box>
  );
};

export default CustomersCardList;
