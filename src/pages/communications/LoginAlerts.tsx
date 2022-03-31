import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export const LoginAlertMissingCredentials = ({
  open,
  ...others
}: DialogProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings?tab=email");
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...others}
    >
      <DialogTitle id="alert-dialog-title">
        Please enter your email address and password
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ mb: 4 }}>
          In order to use the built-in email service, you need to enter your
          email address and password, and optionally IMAP and SMTP
          configurations. We will not store any of your credentials on our
          database and any critical data passed to our server will be securely
          encrypted.
        </DialogContentText>

        <DialogActions>
          <Button variant="contained" onClick={handleClick} autoFocus>
            Go to settings
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export const LoginAlertUnauthorized = ({ open, ...others }: DialogProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings?tab=email");
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...others}
    >
      <DialogTitle id="alert-dialog-title">
        Invalid email address or password
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ mb: 4 }}>
          Please check your email address and password.
        </DialogContentText>

        <DialogActions>
          <Button variant="contained" onClick={handleClick} autoFocus>
            Go to settings
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
