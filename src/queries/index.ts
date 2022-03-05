import axios from "axios";
import { Customer } from "../types";
import { serializeQueryStr } from "../utils";

export const listCustomers = async (query: any) => {
  const { data } = await axios.get(`/customers?${serializeQueryStr(query)}`);
  return data;
};

export const deleteCustomer = async (id: number) => {
  const { data } = await axios.delete(`/customers/${id}`);
  return data;
};

export const createCustomer = async (input: Partial<Customer>) => {
  const { data } = await axios.post(`/customers`, input);
  return data;
};
