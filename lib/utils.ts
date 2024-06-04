import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTableName = (tableName: string) => {
  return tableName?.split("-")[3] === undefined
    ? tableName
    : tableName?.split("-")[3]?.split("Table")[0] === undefined
      ? tableName
      : `${tableName?.split("-")[3]?.split("Table")[0]} Table`;
};
