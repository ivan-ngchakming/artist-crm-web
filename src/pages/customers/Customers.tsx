import { useState, useEffect, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, LinearProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  listCustomers,
  deleteCustomer as deleteCustomerQuery,
} from "../../queries";
import { Customer, Paginated, CUSTOMER_STATUS } from "../../types";
import PageHeader from "../../components/PageHeader";
import CustomersTable from "./CustomerTable";
import { useDevice } from "../../hooks";
import PageContainer from "../../components/PageContainer";
import { palette } from "../../theme";

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

  const { data, isFetching, refetch } = useQuery<Paginated<Customer>>(
    ["listCustomers", page, customerType],
    customerQueryFn,
    { keepPreviousData: true }
  );

  const { mutate: deleteCustomer } = useMutation(
    ["deleteCustomer"],
    deleteCustomerQuery,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listCustomers");
      },
    }
  );

  const handleTabChange = (event: any, newValue: CUSTOMER_STATUS) => {
    setCustomerType(newValue);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, [customerType]: newPage }));
  };

  const headerPrimaryAction = {
    label: "Create",
    isPrimary: true,
    ButtonProps: { startIcon: <AddIcon /> },
  };

  const headerActions = [
    {
      label: "Refresh",
      isPrimary: true,
      ButtonProps: { startIcon: <RefreshIcon /> },
      MenuItemProps: {
        onClick: () => refetch(),
      },
    },
  ];

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
      {isFetching && !!data ? (
        <LinearProgress />
      ) : (
        <Box
          height={4}
          sx={{ backgroundColor: isDesktop ? undefined : palette.IRIDIUM }}
        />
      )}

      <PageContainer display="flex" flexDirection="column">
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
            onDelete={deleteCustomer}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default Customers;
