import { Box, Divider, Typography } from "@mui/material";
import { useMail } from "../../contexts/MailClientContext";
import { Switch } from "../../components";
import { palette } from "../../theme";

const MailViwer = () => {
  const { mails, account } = useMail();

  console.log(mails);

  return (
    <Box height="100%" display="flex">
      <Box sx={{ flex: "0 1 auto" }}>
        <Box height="20%">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Accounts
          </Typography>
          <Box display="flex" alignItems="center" my={3}>
            <Switch defaultChecked activecolor={palette.INDIAN_RED} />
            <Typography sx={{ ml: 1.5 }}>{account.address}</Typography>
          </Box>
          <Divider />
        </Box>

        <Box height="80%" sx={{ border: "1px solid black" }}>
          List mails placeholder
        </Box>
      </Box>

      <Box ml={5} sx={{ border: "1px solid black", flex: "1 1 auto" }}>
        Mail content placeholder
      </Box>
    </Box>
  );
};

export default MailViwer;
