import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab,
  Box,
  styled,
  CircularProgress,
} from "@mui/material";
import { useDevice } from "../../hooks";
import {
  Customer,
  Paginated,
  CUSTOMER_STATUS,
  CUSTOMER_STATUS_COLOR,
} from "../../types";
import CustomersCardList from "./CustomersCardList";
import CustomerDesktopTable from "./CustomerDesktopTable";

type TabsProps = {
  color: string;
} & MuiTabsProps;

const Tabs = styled(MuiTabs)<TabsProps>(({ color }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: color,
  },
}));

const CustomerTable = ({
  data,
  customerType,
  onPageChange,
  onDelete,
  onEdit,
}: {
  data?: Paginated<Customer>;
  customerType: CUSTOMER_STATUS;
  onPageChange: (event: any, page: number) => void;
  onDelete: (id: number) => void;
  onEdit: (customer: Customer) => void;
}) => {
  const { isDesktop } = useDevice();

  const CustomerTableComponent = isDesktop
    ? CustomerDesktopTable
    : CustomersCardList;

  if (!data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress sx={{ color: CUSTOMER_STATUS_COLOR[customerType] }} />
      </Box>
    );

  const customers = data?.data;

  return (
    <CustomerTableComponent
      customers={customers}
      paginationProps={{
        selectedColor: CUSTOMER_STATUS_COLOR[customerType],
        count: data.meta.totalPages,
        page: data.meta.currentPage,
        onChange: onPageChange,
      }}
      color={CUSTOMER_STATUS_COLOR[customerType]}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

const CustomersTablePage = ({
  data,
  customerType,
  onTabChange,
  onPageChange,
  onDelete,
  onEdit,
}: {
  data?: Paginated<Customer>;
  customerType: CUSTOMER_STATUS;
  onTabChange: (event: any, newValue: CUSTOMER_STATUS) => void;
  onPageChange: (event: any, page: number) => void;
  onDelete: (id: number) => void;
  onEdit: (customer: Customer) => void;
}) => {
  return (
    <Box py={3} height="100%" display="flex" flexDirection="column">
      <Box sx={{ borderBottom: 1, borderColor: "divider", flex: "0 1 auto" }}>
        <Tabs
          scrollButtons="auto"
          value={customerType}
          onChange={onTabChange}
          aria-label="customer type tab"
          color={CUSTOMER_STATUS_COLOR[customerType]}
        >
          {Object.values(CUSTOMER_STATUS).map((type) => (
            <Tab key={type} value={type} label={type} disableRipple />
          ))}
        </Tabs>
      </Box>

      <Box mt={2} sx={{ flex: "1 1 auto" }}>
        <CustomerTable
          data={data}
          customerType={customerType}
          onPageChange={onPageChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Box>
    </Box>
  );
};

export default CustomersTablePage;
