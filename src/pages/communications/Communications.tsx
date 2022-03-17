import { Box } from "@mui/material";
import { PageContainer, PageHeader } from "../../components";
import { MailProvider } from "../../contexts/MailClientContext";
import MailViewer from "./MailViewer";

const Communications = () => {
  return (
    <MailProvider>
      <PageContainer display="flex" flexDirection="column">
        <Box sx={{ flex: "0 1 auto" }}>
          <PageHeader title="Communications" />
        </Box>
        <Box height="75vh" sx={{ flex: "1 1 auto" }} mt={5}>
          <MailViewer />
        </Box>
      </PageContainer>
    </MailProvider>
  );
};

export default Communications;
