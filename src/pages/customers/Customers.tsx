import AddIcon from "@mui/icons-material/Add";
import PageHeader, { Action } from "../../components/PageHeader";
import CustomersTable from "./CustomerTable";

const headerPrimaryAction = {
  label: "Create",
  isPrimary: true,
  ButtonProps: { startIcon: <AddIcon /> },
  MenuItemProps: {},
};

const headerActions = [] as Action[];

const Customers = () => {
  return (
    <>
      <PageHeader
        title="Customers"
        actions={headerActions}
        primaryAction={headerPrimaryAction}
      />

      <CustomersTable />
    </>
  );
};

export default Customers;
