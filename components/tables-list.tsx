"use client";
import { ListTablesResponse } from "@/libs/dynamodb/list-tables";

const formatTableName = (tableName: string) => {
  return tableName?.split("-")[3] === undefined
    ? tableName
    : tableName?.split("-")[3]?.split("Table")[0] === undefined
      ? tableName
      : `${tableName?.split("-")[3]?.split("Table")[0]} Table`;
};

export function TablesList({ tables }: { tables: ListTablesResponse }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mt-8">
      {tables?.TableNames?.map((tableName: string) => {
        return (
          <button
            className="p-4 text-2xl hover:scale-110 transition"
            onClick={() => {
              console.log("TODO");
              // addSelectedTable(tableName);
            }}
            key={tableName}
          >
            {formatTableName(tableName)}
          </button>
        );
      })}
    </section>
  );
}
