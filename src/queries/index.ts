import axios from "axios";

export const listCustomers = async () => {
  const { data } = await axios.get("customers");
  return data;
};
