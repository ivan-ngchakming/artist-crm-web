import { Divider, TextField, Typography, Box } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link } from "../../components";
import { useDevice } from "../../hooks";
import { palette } from "../../theme";

const EmailSettingsForm = () => {
  const { isMobile } = useDevice();
  const [cookies, setCookie] = useCookies(["emailUser", "emailPass"]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookie("emailUser", event.target.value, { path: "/" });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookie("emailPass", event.target.value, { path: "/" });
  };

  return (
    <>
      <TextField
        id="emailUser"
        label="Email"
        size="small"
        sx={{ mx: isMobile ? 0 : 1, my: 1 }}
        autoComplete="email"
        value={cookies.emailUser}
        onChange={handleEmailChange}
      />
      <TextField
        id="emailPass"
        label="Password"
        size="small"
        sx={{ mx: isMobile ? 0 : 1, my: 1 }}
        type="password"
        autoComplete="on"
        value={cookies.emailPass}
        onChange={handlePasswordChange}
      />
    </>
  );
};

const EmailSettings = () => {
  const { isMobile } = useDevice();
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
        Email Communication Settings
      </Typography>
      <Typography variant="body1" sx={{ color: palette.GREY, mb: 5 }}>
        Setup your email account integration with ArtistCRM so you can
        communicate with your valued customer directly on the platform.
      </Typography>
      <Divider />

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        mt={3}
        sx={{ color: palette.GREY }}
      >
        <Box maxWidth={350}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
            Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Enter your email account credentials to use email communication
            feature. We do not store any of your password on our server.
          </Typography>
          <Link
            underlineColor={palette.DENIM_BLUE}
            sx={{ color: palette.DENIM_BLUE }}
          >
            <Typography component="span">Learn more</Typography>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml={isMobile ? 0 : 12}
          width="100%"
        >
          <EmailSettingsForm />
        </Box>
      </Box>
    </>
  );
};

export default EmailSettings;
