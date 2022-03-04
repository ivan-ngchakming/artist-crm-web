import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Slide,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSwipeable } from "react-swipeable";
import { Customer } from "../../types";
import { getCustomerFullName, formatDate } from "../../utils";
import Pagination, { PaginationProps } from "./Pagination";

const CustomerCard = ({
  customer,
  showActions = false,
  onSwipeOpen,
  onSwipeClose,
  onDelete,
}: {
  customer: Customer;
  showActions?: boolean;
  onSwipeOpen?: (id: number) => void;
  onSwipeClose?: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const { id, email, instagram, status, updatedDate } = customer;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onSwipeOpen && onSwipeOpen(id),
    onSwipedRight: () => onSwipeClose && onSwipeClose(id),
  });

  return (
    <Card key={id} {...swipeHandlers}>
      <Box display="grid" sx={{ gridTemplateColumns: "2fr" }}>
        <CardContent
          sx={{
            gridColumnStart: 1,
            gridRowStart: 1,
            gridColumnEnd: 4,
            gridRowEnd: 1,
          }}
          onClick={() => {
            onSwipeClose && onSwipeClose(id);
          }}
        >
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

        <Box sx={{ gridColumnStart: 2, gridRowStart: 1 }}>
          <Slide in={showActions} direction="left">
            <Box display="flex" flexDirection="column" height="100%">
              <Button
                sx={{
                  width: "100%",
                  height: "50%",
                  borderRadius: 0,
                }}
                variant="contained"
                color="success"
                disabled
              >
                Edit
              </Button>
              <Button
                sx={{
                  width: "100%",
                  height: "50%",
                  borderRadius: 0,
                }}
                variant="contained"
                color="error"
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </Box>
          </Slide>
        </Box>
      </Box>
    </Card>
  );
};

const CustomersCardList = ({
  customers,
  paginationProps,
  color,
  onDelete,
}: {
  customers: Customer[];
  paginationProps: PaginationProps;
  color: string;
  onDelete: (id: number) => void;
}) => {
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const handleSwipeOpen = (id: number) => {
    setEditingCardId(id);
  };

  const handleSwipeClose = () => {
    setEditingCardId(null);
  };

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
        return (
          <Box key={customer.id} m={2}>
            <CustomerCard
              customer={customer}
              showActions={editingCardId === customer.id}
              onSwipeOpen={handleSwipeOpen}
              onSwipeClose={handleSwipeClose}
              onDelete={onDelete}
            />
          </Box>
        );
      })}

      <Box display="flex" justifyContent="center">
        <Pagination {...paginationProps} />
      </Box>

      <Box my={2} mx={4}>
        <Typography variant="overline" textAlign="center">
          Tip: Swipe left on customer card for more actions.
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomersCardList;
