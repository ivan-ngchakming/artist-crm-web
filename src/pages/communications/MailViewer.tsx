import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useMails, Mail } from "../../hooks/useMails";
import { useDevice } from "../../hooks";
import {
  LoginAlertMissingCredentials,
  LoginAlertUnauthorized,
} from "./LoginAlerts";
import MailViewerSidebar, { SIDEBAR_WIDTH } from "./MailViewerSidebar";
import MailBody, { MailBodyContainer } from "./mailBody/MailBody";

const MailViewer = () => {
  const { isMobile, isDesktop } = useDevice();
  const { mails, account, validCredentials, isLoading, error } = useMails();
  const [selectedMail, setSelectedMail] = useState<Mail>();
  const [open, setOpen] = useState(false);

  const handleSelect = (mail: Mail) => {
    if (isMobile) setOpen(true);
    setSelectedMail(mail);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isLoading && mails.length > 0) {
      setSelectedMail(mails[0]);
    }
  }, [isLoading, setSelectedMail, mails]);

  return (
    <Box
      height="100%"
      display="flex"
      sx={
        isMobile
          ? {
              width: "100%",
              justifyContent: "center",
            }
          : null
      }
    >
      <MailViewerSidebar
        mails={mails}
        account={account}
        showSelector={isDesktop}
        selectedMail={selectedMail}
        onSelect={handleSelect}
      />
      <MailBodyContainer
        open={open}
        onClose={handleClose}
        isDesktop={isDesktop}
        sidebarWidth={SIDEBAR_WIDTH}
      >
        <MailBody mail={selectedMail} isLoading={isLoading} />
      </MailBodyContainer>

      <LoginAlertMissingCredentials open={!validCredentials} />
      <LoginAlertUnauthorized open={(error as any)?.response?.status === 401} />
    </Box>
  );
};

export default MailViewer;
