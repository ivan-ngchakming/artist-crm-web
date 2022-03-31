import { Box, Divider, Typography } from "@mui/material";
import { Mail, MailAccount } from "../../hooks/useMails";
import { ScrollBarWrapper, Switch } from "../../components";
import { palette } from "../../theme";
import MailCard from "./MailCard";

export const SIDEBAR_WIDTH = 360;

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
  selectedMail?: Mail;
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
            isSelected={showSelector && selectedMail?.id === mail.id}
            onSelect={onSelect}
          />
        ))}
      </ScrollBarWrapper>
    </Box>
  );
};

export default MailViewerSidebar;
