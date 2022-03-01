import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import { Customer } from "../../types";
import { getCustomerFullName } from "../../utils";

const CustomersCardList = ({ customers }: { customers: Customer[] }) => {
  return (
    <Box>
      {customers.map((customer) => {
        const { id, email, instagram } = customer;
        return (
          <Box key={id} m={2}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography>
                    {getCustomerFullName(customer) || "-"}
                  </Typography>
                  <Typography>{email || "-"}</Typography>
                  <Typography>{instagram || "-"}</Typography>
                  <Typography>Active</Typography>
                  <Typography>-</Typography>
                  <Typography textAlign="right">{id}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default CustomersCardList;
