import { palette } from "../theme";

export type Address = {
  id: number;
  lineOne: string;
  lineTwo: string;
};

export type Customer = {
  id: number;
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  instagram?: any;
  email?: string;
  address?: Address;
  correspondenceAddress?: Address;
};

export enum CUSTOMER_STATUS {
  ALL = "All",
  POTENTIAL = "Potential",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export const CUSTOMER_STATUS_COLOR = {
  [CUSTOMER_STATUS.ALL]: palette.BLUE_IVY,
  [CUSTOMER_STATUS.POTENTIAL]: palette.INDIAN_RED,
  [CUSTOMER_STATUS.ACTIVE]: palette.DARK_PASTEL_GREEN,
  [CUSTOMER_STATUS.COMPLETED]: palette.LIGHT_SLATE_BLUE,
};
