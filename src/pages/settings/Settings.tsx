import {
  Box,
  styled,
  Tab,
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
} from "@mui/material";
import { useState } from "react";
import { PageContainer, PageHeader } from "../../components";
import { palette } from "../../theme";
import EmailSettings from "./EmailSettings";

type TabsProps = {
  color: string;
} & MuiTabsProps;

const Tabs = styled(MuiTabs)<TabsProps>(({ color }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: color,
  },
}));

enum SETTING_TABS {
  GENERAL = "General",
  EMAIL = "Email",
}

const TAB_COLOR = {
  [SETTING_TABS.GENERAL]: palette.SILVER_CHALICE,
  [SETTING_TABS.EMAIL]: palette.INDIAN_RED,
};

const Settings = () => {
  const [tab, setTab] = useState(SETTING_TABS.EMAIL);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: SETTING_TABS
  ) => {
    setTab(newValue);
  };

  return (
    <PageContainer>
      <PageHeader title="Settings" />
      <Box mb={3} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          scrollButtons="auto"
          aria-label="customer type tab"
          color={TAB_COLOR[tab]}
        >
          {Object.values(SETTING_TABS).map((setting) => (
            <Tab key={setting} value={setting} label={setting} disableRipple />
          ))}
        </Tabs>
      </Box>

      {tab === SETTING_TABS.EMAIL && <EmailSettings />}
    </PageContainer>
  );
};

export default Settings;
