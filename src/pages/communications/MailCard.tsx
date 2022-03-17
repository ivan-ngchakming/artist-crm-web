import {
  Box,
  Divider,
  Typography,
  Badge,
  styled,
  CardActionArea,
} from "@mui/material";
import { Mail } from "../../contexts/MailClientContext";
import { palette } from "../../theme";
import { formatDate } from "../../utils";

const Selector = styled("div")({
  width: 3,
  height: "60%",
  backgroundColor: palette.INDIAN_RED,
});

const SelectorNull = styled("div")({
  width: 3,
  height: "60%",
});

const MailCard = ({
  mail,
  isSelected,
  onSelect,
}: {
  mail: Mail;
  isSelected?: boolean;
  onSelect?: (mail: Mail) => void;
}) => {
  const { envelope } = mail;
  const seen = mail.flags.includes("\\Seen");

  return (
    <Box>
      <CardActionArea
        disabled={isSelected}
        onClick={() => onSelect && onSelect(mail)}
      >
        <Box mt={2} mr={1} display="flex">
          <Box mb={2} display="flex" alignItems="center">
            {isSelected ? <Selector /> : <SelectorNull />}
          </Box>
          <Box ml={1.5}>
            <Badge
              variant="dot"
              color="secondary"
              sx={{ mr: 1 }}
              invisible={seen}
            >
              <Box>
                <Typography variant="h6">{envelope.from[0].name}</Typography>
                <Typography variant="overline" color={palette.SILVER_CHALICE}>
                  FROM: {envelope.from[0].address}
                </Typography>
                <Typography variant="body1" color={palette.SILVER_CHALICE}>
                  {envelope.subject}
                </Typography>
              </Box>
            </Badge>
            <Box display="flex" justifyContent="flex-end" mb={1} mt={1}>
              <Typography variant="caption" color={palette.SILVER_CHALICE}>
                {formatDate(new Date(envelope.date))}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
      <Divider />
    </Box>
  );
};

export default MailCard;
