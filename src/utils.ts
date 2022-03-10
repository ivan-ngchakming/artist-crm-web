import React from "react";
import { format, isToday, isYesterday } from "date-fns";
import { Customer } from "./types";

export const createContext = <T>() => {
  const Context = React.createContext<T | undefined>(undefined);
  const useContext = () => {
    const ctx = React.useContext(Context);
    if (!ctx) throw new Error("useContext must be inside a provider!");
    return ctx;
  };
  return [useContext, Context] as const;
};

export const getCustomerFullName = ({
  firstName,
  lastName,
  preferredName,
}: Customer) => {
  let name = "";
  if (firstName) name = name + firstName + " ";
  if (lastName) name = name + lastName;
  if (preferredName && name !== "") name = name + ", ";
  if (preferredName) name = name + preferredName;
  return name;
};

export const serializeQueryStr = (obj: any) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== undefined) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const formatDate = (date: Date) => {
  if (isToday(new Date(date))) return "Today";
  if (isYesterday(new Date(date))) return "Yesterday";
  return format(new Date(date), "MMM d, yyyy h:mm");
};
