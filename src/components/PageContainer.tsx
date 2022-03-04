import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import { useDevice } from "../hooks";

const PageContainer = ({
  children,
  ...restProps
}: { children: ReactNode } & BoxProps) => {
  const { isDesktop } = useDevice();

  return (
    <Box
      {...(isDesktop ? { mt: 6, mr: 9, mb: 4, ml: 6 } : null)}
      height={`calc( 100% - 48px - 32px - 4px )`}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
