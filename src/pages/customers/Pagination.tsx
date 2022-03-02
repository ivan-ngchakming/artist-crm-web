import {
  styled,
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  PaginationItem as MuiPaginationItem,
  PaginationItemProps as MuiPaginationItemProps,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export type PaginationProps = MuiPaginationProps & { selectedColor: string };

type PaginationItemProps = MuiPaginationItemProps & { selectedcolor: string };

const PaginationItem = styled(MuiPaginationItem)<PaginationItemProps>(
  ({ selectedcolor }) => ({
    "&.Mui-selected": {
      backgroundColor: alpha(selectedcolor, 0.8),
      color: "white",
    },
    "&.Mui-selected:hover": {
      backgroundColor: selectedcolor,
      color: "white",
    },
  })
);

const Pagination = ({ selectedColor, ...paginationProps }: PaginationProps) => (
  <MuiPagination
    variant="outlined"
    shape="rounded"
    {...paginationProps}
    renderItem={(item) => (
      <PaginationItem {...item} selectedcolor={selectedColor} />
    )}
  />
);

export default Pagination;
