import { ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Box,
  Divider,
  Typography,
  styled,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMails, Mail, MailAccount } from "../../hooks/useMails";
import { Switch } from "../../components";
import { palette } from "../../theme";
import { useDevice } from "../../hooks";
import MailCard from "./MailCard";
import MailHeader from "./MailHeader";
import LoginAlert from "./LoginAlert";

const SIDEBAR_WIDTH = 360;

const ScrollBarWrapper = styled(Box)({
  // Styling Scrollbars in Chrome, Edge, and Safari
  "&::-webkit-scrollbar": {
    width: "12px", // width of the entire scrollbar
  },
  "&::-webkit-scrollbar-track": {
    background: "white", // color of the tracking area
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: palette.INDIAN_RED, // color of the scroll thumb
    borderRadius: "20px", // roundness of the scroll thumb
    border: `3px solid ${"white"}`, // creates padding around scroll thumb
  },
  // Style scroll bar for Firefox
  scrollbarWidth: "thin", // auto or thin
  scrollbarColor: `${palette.INDIAN_RED} ${"white"}`, // scroll thumb and track
});

const MailViewerSidebar = ({
  mails,
  account,
  showSelector,
  selectedMail,
  onSelect,
}: {
  mails: Mail[];
  account: MailAccount;
  showSelector?: boolean;
  selectedMail: Mail;
  onSelect: (mail: Mail) => void;
}) => {
  return (
    <Box
      width={SIDEBAR_WIDTH}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box sx={{ flex: "0 1 auto" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Accounts
        </Typography>
        <Box display="flex" alignItems="center" my={3}>
          <Switch defaultChecked activecolor={palette.INDIAN_RED} />
          <Typography sx={{ ml: 1.5 }}>{account.address}</Typography>
        </Box>
        <Divider />
      </Box>

      <ScrollBarWrapper sx={{ flex: "1 1 auto", overflowY: "auto", mt: 2 }}>
        {mails.map((mail) => (
          <MailCard
            key={mail.id}
            mail={mail}
            isSelected={showSelector && selectedMail.id === mail.id}
            onSelect={onSelect}
          />
        ))}
      </ScrollBarWrapper>
    </Box>
  );
};

const MailBody = ({ mail }: { mail: Mail }) => {
  return (
    <>
      <Box mb={4} mx={4}>
        <MailHeader mail={mail} />
      </Box>
      <Divider />
      <ScrollBarWrapper m={4} sx={{ overflowY: "auto" }}>
        {mail.bodyPartsDecoded[0]
          .replace("\r", "")
          .split("\n")
          .map((paragraph) => (
            <>
              {paragraph}
              <br />
            </>
          ))}
      </ScrollBarWrapper>
    </>
  );
};

const MailBodyContainer = ({
  isDesktop,
  children,
  open,
  onClose,
}: {
  isDesktop: boolean;
  children: ReactNode;
  open: boolean;
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick"
  ) => void;
}) => {
  if (isDesktop)
    return (
      <Box
        ml={5}
        pt={4}
        display="flex"
        flexDirection="column"
        sx={{
          width: `calc( 100% - ${SIDEBAR_WIDTH}px )`,
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

const MailViewer = () => {
  const { isMobile, isDesktop } = useDevice();
  const { mails, account } = useMails();
  const [selectedMail, setSelectedMail] = useState<Mail>(mails[0]);
  const [open, setOpen] = useState(false);

  const [cookies] = useCookies(["emailUser", "emailPass"]);
  const { emailUser, emailPass } = cookies;
  const validCredentials = !!emailUser && !!emailPass;

  const handleSelect = (mail: Mail) => {
    if (isMobile) setOpen(true);
    setSelectedMail(mail);
  };

  const handleClose = () => setOpen(false);

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
      >
        <MailBody mail={selectedMail} />
      </MailBodyContainer>

      <LoginAlert open={!validCredentials} />
    </Box>
  );
};

export default MailViewer;
