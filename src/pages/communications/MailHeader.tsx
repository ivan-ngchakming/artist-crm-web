import { Box, IconButton, Typography } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ForwardIcon from "@mui/icons-material/Forward";
import { Mail } from "../../contexts/MailClientContext";
import { palette } from "../../theme";
import { formatDate } from "../../utils";

const MailHeader = ({ mail }: { mail: Mail }) => {
  const { envelope } = mail;
  const { subject, from, to, date } = envelope;

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {subject}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: palette.SILVER_CHALICE, mt: 1 }}
        >
          From: {from.map((addr) => addr.address).join(", ")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: palette.SILVER_CHALICE, mt: 1 }}
        >
          To: {to.map((addr) => addr.address).join(", ")}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography
          variant="body1"
          textAlign="right"
          sx={{ color: palette.SILVER_CHALICE }}
        >
          {formatDate(new Date(date))}
        </Typography>
        <Box>
          <IconButton>
            <ReplyIcon />
          </IconButton>
          <IconButton>
            <ReplyAllIcon />
          </IconButton>
          <IconButton>
            <ForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MailHeader;
