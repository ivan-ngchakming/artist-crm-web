import { useState } from "react";
import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Checkbox,
  styled,
} from "@mui/material";
import { palette } from "../../theme";
import { useDevice } from "../../hooks";
import CustomersCardList from "./CustomersCardList";

type TabsProps = {
  color: string;
} & MuiTabsProps;

const Tabs = styled(MuiTabs)<TabsProps>(({ color }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: color,
  },
}));

const TableCell = styled(MuiTableCell)({
  borderBottom: "none",
});

enum CUSTOMER_TYPE {
  ALL = "All",
  POTENTIAL = "Potential",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

const CUSTOMER_TYPE_COLOR = {
  [CUSTOMER_TYPE.ALL]: palette.BLUE_IVY,
  [CUSTOMER_TYPE.POTENTIAL]: palette.INDIAN_RED,
  [CUSTOMER_TYPE.ACTIVE]: palette.DARK_PASTEL_GREEN,
  [CUSTOMER_TYPE.COMPLETED]: palette.LIGHT_SLATE_BLUE,
};

/**
 * TODO: Add props type
 */
const DesktopCustomersTable = ({ customers }: any) => {
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
          {customers.map((x: any) => (
            <TableRow key={x}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell align="left">{x}</TableCell>
              <TableCell align="left">Ng Chak Ming, Ivan</TableCell>
              <TableCell align="left">ivan.ng.chak.ming@gmail.com</TableCell>
              <TableCell align="left">ivan0313_</TableCell>
              <TableCell align="left">Active</TableCell>
              <TableCell align="left">Feb 27, 2022</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const customers = [1, 2, 3, 4, 5, 6, 7];

const CustomersTable = () => {
  const { isDesktop } = useDevice();
  const [customerType, setCustomerType] = useState<CUSTOMER_TYPE>(
    CUSTOMER_TYPE.ALL
  );

  const handleTabChange = (event: any, newValue: CUSTOMER_TYPE) => {
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
          color={CUSTOMER_TYPE_COLOR[customerType]}
        >
          {Object.values(CUSTOMER_TYPE).map((type) => (
            <Tab key={type} value={type} label={type} disableRipple />
          ))}
        </Tabs>
      </Box>

      <Box mt={2}>
        {isDesktop ? (
          <DesktopCustomersTable customers={customers} />
        ) : (
          <CustomersCardList customers={customers} />
        )}
      </Box>
    </Box>
  );
};

export default CustomersTable;
