import {
  styled,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
} from "@mui/material";

export type LinkProps = {
  underlineColor?: string;
} & MuiLinkProps;

const LinkRoot = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "underlineColor",
})<LinkProps>(({ underlineColor }) => ({
  position: "relative",
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "2px",
    bottom: "-3px",
    left: "0%",
    transform: "translate(0%, 50%)",
    backgroundColor: underlineColor || "red",
    visibility: "hidden",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover:before": {
    visibility: "visible",
    width: "100%",
  },
}));

const Link = (props: LinkProps) => {
  return <LinkRoot underline="none" {...props} />;
};

export default Link;
