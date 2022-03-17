import { useState } from "react";
import { Box, Divider, Typography, styled } from "@mui/material";
import { useMail, Mail } from "../../contexts/MailClientContext";
import { Switch } from "../../components";
import { palette } from "../../theme";
import MailCard from "./MailCard";
import MailHeader from "./MailHeader";

const SIDEBAR_WIDTH = 360;

const ScrollBarWrapper = styled(Box)({
  // Styling Scrollbars in Chrome, Edge, and Safari
  "&::-webkit-scrollbar": {
    width: "12px", // width of the entire scrollbar
  },
  "&::-webkit-scrollbar-track": {
    background: "orange", // color of the tracking area
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "blue", // color of the scroll thumb
    borderRadius: "20px", // roundness of the scroll thumb
    border: "3px solid orange", // creates padding around scroll thumb
  },
  // Style scroll bar for Firefox
  scrollbarWidth: "thin", // auto or thin
  scrollbarColor: `${palette.INDIAN_RED} ${"white"}`, // scroll thumb and track
});

const MailViewer = () => {
  const { mails, account } = useMail();
  const [selectedMail, setSelectedMail] = useState<Mail>(mails[0]);

  return (
    <Box height="100%" display="flex">
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
              isSelected={selectedMail.id === mail.id}
              onSelect={(mail) => setSelectedMail(mail)}
            />
          ))}
        </ScrollBarWrapper>
      </Box>
      <Box
        ml={5}
        display="flex"
        flexDirection="column"
        sx={{
          width: `calc( 100% - ${SIDEBAR_WIDTH}px )`,
          borderRadius: 8,
          border: `1px solid ${palette.SILVER_CHALICE}`,
        }}
      >
        <Box m={4}>
          <MailHeader mail={selectedMail} />
        </Box>
        <Divider />
        <ScrollBarWrapper m={4} sx={{ overflowY: "auto" }}>
          {selectedMail.bodyPartsDecoded[0]
            .replace("\r", "")
            .split("\n")
            .map((paragraph) => (
              <>
                {paragraph}
                <br />
              </>
            ))}
        </ScrollBarWrapper>
      </Box>
    </Box>
  );
};

export default MailViewer;
