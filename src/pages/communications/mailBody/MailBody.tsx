import { ReactNode } from "react";
import { Box, Divider, Dialog, IconButton, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Mail } from "../../../hooks/useMails";
import { ScrollBarWrapper } from "../../../components";
import { palette } from "../../../theme";
import MailHeader from "./MailHeader";

const MailBody = ({
  mail,
  isLoading,
}: {
  mail?: Mail;
  isLoading?: boolean;
}) => {
  const renderMailBody = (mailArg: Mail) =>
    mailArg.bodyPartsDecoded[0]
      .replace("\r", "")
      .split("\n")
      .map((paragraph, index) => (
        <p key={index}>
          {paragraph}
          <br />
        </p>
      ));

  return (
    <>
      <Box mb={4} mx={4}>
        {mail && <MailHeader mail={mail} />}
        {isLoading && (
          <Box>
            <Skeleton />
          </Box>
        )}
      </Box>
      <Divider />
      <ScrollBarWrapper m={4} sx={{ overflowY: "auto" }}>
        {mail && renderMailBody(mail)}
        {isLoading && (
          <Box>
            <Skeleton />
          </Box>
        )}
      </ScrollBarWrapper>
    </>
  );
};

export const MailBodyContainer = ({
  isDesktop,
  children,
  open,
  onClose,
  sidebarWidth,
}: {
  isDesktop: boolean;
  children: ReactNode;
  open: boolean;
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick"
  ) => void;
  sidebarWidth: number;
}) => {
  if (isDesktop)
    return (
      <Box
        ml={5}
        pt={4}
        display="flex"
        flexDirection="column"
        sx={{
          width: `calc( 100% - ${sidebarWidth}px )`,
          borderRadius: 8,
          border: `1px solid ${palette.SILVER_CHALICE}`,
        }}
      >
        {children}
      </Box>
    );

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <Box display="flex" justifyContent="flex-end" mr={2} py={1}>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => onClose({}, "closeButtonClick")}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Dialog>
  );
};

export default MailBody;
