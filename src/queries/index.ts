import axios from "axios";

export const listCustomers = async (page: number) => {
  const { data } = await axios.get(
    `/customers?page=${page}&limit=10&sortBy=id:ASC`
  );
  return data;
};
