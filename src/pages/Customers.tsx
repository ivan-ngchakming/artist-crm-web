import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "../components";
import { Action } from "../components/PageHeader";

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
    </>
  );
};

export default Customers;
