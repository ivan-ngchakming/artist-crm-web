import { useState, useEffect, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, LinearProgress } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { listCustomers } from "../../queries";
import { Customer, Paginated, CUSTOMER_STATUS } from "../../types";
import PageHeader, { Action } from "../../components/PageHeader";
import CustomersTable from "./CustomerTable";
import { useDevice } from "../../hooks";

const headerPrimaryAction = {
  label: "Create",
  isPrimary: true,
  ButtonProps: { startIcon: <AddIcon /> },
  MenuItemProps: {},
};

const headerActions = [] as Action[];

const Customers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState({
    [CUSTOMER_STATUS.ALL]: 1,
    [CUSTOMER_STATUS.POTENTIAL]: 1,
    [CUSTOMER_STATUS.ACTIVE]: 1,
    [CUSTOMER_STATUS.COMPLETED]: 1,
  });
  const { isDesktop } = useDevice();

  const [customerType, setCustomerType] = useState<CUSTOMER_STATUS>(
    CUSTOMER_STATUS.ALL
  );

  const customerQueryFn = useCallback(
    () =>
      listCustomers({
        page: page[customerType],
        limit: 10,
        "filter.status":
          customerType === CUSTOMER_STATUS.ALL
            ? undefined
            : "$eq:" + customerType,
      }),
    [customerType, page]
  );

  const { data, isFetching } = useQuery<Paginated<Customer>>(
    ["listCustomers", page, customerType],
    customerQueryFn,
    { keepPreviousData: true }
  );

  const handleTabChange = (event: any, newValue: CUSTOMER_STATUS) => {
    setCustomerType(newValue);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, [customerType]: newPage }));
  };

  useEffect(() => {
    if (data?.links.next) {
      queryClient.prefetchQuery(
        ["listCustomers", page[customerType] + 1, customerType],
        customerQueryFn
      );
    }
    Object.values(CUSTOMER_STATUS).forEach((type) => {
      queryClient.prefetchQuery(
        ["listCustomers", page[customerType], type],
        customerQueryFn
      );
    });
  }, [data, page, queryClient, customerType, customerQueryFn]);

  // Prevent current page number larger than total page number
  useEffect(() => {
    if (data && page[customerType] > data.meta.totalPages) {
      setPage((prev) => ({ ...prev, [customerType]: data.meta.totalPages }));
    }
  }, [customerType, data, page]);

  return (
    <>
      {isFetching && !!data ? <LinearProgress /> : <Box height={4} />}
      <Box
        {...(isDesktop ? { mt: 6, mr: 9, mb: 4, ml: 6 } : null)}
        height={`calc( 100% - 48px - 32px - 4px )`}
        display="flex"
        flexDirection="column"
      >
        <Box sx={{ flex: "0 1 auto" }}>
          <PageHeader
            title="Customers"
            actions={headerActions}
            primaryAction={headerPrimaryAction}
          />
        </Box>

        <Box sx={{ flex: "1 1 auto" }}>
          <CustomersTable
            data={data}
            customerType={customerType}
            onPageChange={handlePageChange}
            onTabChange={handleTabChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Customers;
