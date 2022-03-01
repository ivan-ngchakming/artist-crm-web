import { Customer } from "./types";

export const getCustomerFullName = ({
  firstName,
  lastName,
  preferredName,
}: Customer) => {
  let name = "";
  if (firstName) name = name + firstName + " ";
  if (lastName) name = name + lastName;
  if (name !== "") name = name + ", ";
  if (preferredName) name = name + preferredName;
  return name;
};
