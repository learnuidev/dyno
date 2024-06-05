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

export const removeNull = function removeNull(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
};

export const pluck = (obj: any, keys: any) => {
  return Object.entries(obj).reduce((acc, keyVal) => {
    const [key, val] = keyVal;

    if (keys?.includes(key)) {
      return {
        ...acc,
        [key]: val,
      };
    } else {
      return acc;
    }
  }, {});
};
