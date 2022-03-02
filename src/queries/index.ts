import axios from "axios";
import { serializeQueryStr } from "../utils";

export const listCustomers = async (query: any) => {
  const { data } = await axios.get(`/customers?${serializeQueryStr(query)}`);
  return data;
};
