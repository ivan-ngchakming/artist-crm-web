import { useState } from "react";
import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab,
  Box,
  styled,
} from "@mui/material";
import { useQuery } from "react-query";
import { useDevice } from "../../hooks";
import { listCustomers } from "../../queries";
import { Customer, CUSTOMER_STATUS, CUSTOMER_STATUS_COLOR } from "../../types";
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

const CustomersTable = () => {
  const { isDesktop } = useDevice();
  const [customerType, setCustomerType] = useState<CUSTOMER_STATUS>(
    CUSTOMER_STATUS.ALL
  );
  const { data } = useQuery<Customer[]>("listCustomers", listCustomers);

  const handleTabChange = (event: any, newValue: CUSTOMER_STATUS) => {
    setCustomerType(newValue);
  };

  return (
    <Box py={3}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          scrollButtons="auto"
          value={customerType}
          onChange={handleTabChange}
          aria-label="customer type tab"
          color={CUSTOMER_STATUS_COLOR[customerType]}
        >
          {Object.values(CUSTOMER_STATUS).map((type) => (
            <Tab key={type} value={type} label={type} disableRipple />
          ))}
        </Tabs>
      </Box>

      {data && (
        <Box mt={2}>
          {isDesktop ? (
            <CustomerDesktopTable customers={data} />
          ) : (
            <CustomersCardList customers={data} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default CustomersTable;
