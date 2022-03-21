import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import { palette } from "../theme";

export type NavItem = {
  key: string;
  color: string;
  label: string;
  Icon: React.FC<any>;
};

export const NAV_ITEMS = [
  {
    key: "customers",
    color: palette.LILAC,
    label: "Customers",
    Icon: PersonOutlineIcon,
  },
  {
    key: "communications",
    color: palette.DENIM_BLUE,
    label: "Communication",
    Icon: MailOutlineIcon,
  },
  {
    key: "analytics",
    color: palette.DARK_PASTEL_GREEN,
    label: "Analytics",
    Icon: PieChartOutlineOutlinedIcon,
  },
  {
    key: "ideas",
    color: palette.INDIAN_RED,
    label: "Ideas",
    Icon: LightbulbOutlinedIcon,
  },
] as NavItem[];
