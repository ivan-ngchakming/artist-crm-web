import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab,
  Box,
  styled,
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

const CustomersTable = ({
  data,
  customerType,
  onTabChange,
  onPageChange,
}: {
  data?: Paginated<Customer>;
  customerType: CUSTOMER_STATUS;
  onTabChange: (event: any, newValue: CUSTOMER_STATUS) => void;
  onPageChange: (event: any, page: number) => void;
}) => {
  const { isDesktop } = useDevice();

  const customers = data?.data;

  const color = CUSTOMER_STATUS_COLOR[customerType];

  return (
    <Box py={3} height="100%" display="flex" flexDirection="column">
      <Box sx={{ borderBottom: 1, borderColor: "divider", flex: "0 1 auto" }}>
        <Tabs
          scrollButtons="auto"
          value={customerType}
          onChange={onTabChange}
          aria-label="customer type tab"
          color={color}
        >
          {Object.values(CUSTOMER_STATUS).map((type) => (
            <Tab key={type} value={type} label={type} disableRipple />
          ))}
        </Tabs>
      </Box>

      <Box mt={2} sx={{ flex: "1 1 auto" }}>
        {customers && isDesktop && (
          <CustomerDesktopTable
            customers={customers}
            paginationProps={{
              selectedColor: color,
              count: data.meta.totalPages,
              page: data.meta.currentPage,
              onChange: onPageChange,
            }}
            color={CUSTOMER_STATUS_COLOR[customerType]}
          />
        )}
        {customers && !isDesktop && (
          <CustomersCardList
            customers={customers}
            paginationProps={{
              selectedColor: color,
              count: data.meta.totalPages,
              page: data.meta.currentPage,
              onChange: onPageChange,
            }}
            color={CUSTOMER_STATUS_COLOR[customerType]}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomersTable;
