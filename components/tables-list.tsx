"use client";
// import { ListTablesResponse } from "@/libs/dynamodb/list-tables";
import { useState } from "react";
import { SelectedTable } from "./selected-table";
import { useQuery } from "@tanstack/react-query";
import { ListTablesResponse } from "@/libs/dynamodb/list-tables";

const formatTableName = (tableName: string) => {
  return tableName?.split("-")[3] === undefined
    ? tableName
    : tableName?.split("-")[3]?.split("Table")[0] === undefined
      ? tableName
      : `${tableName?.split("-")[3]?.split("Table")[0]} Table`;
};

const useListTables = () => {
  // const { data: authUser } = useCurrentAuthUser({});
  const authUser = {
    jwt: "",
  };
  return useQuery({
    queryKey: ["list-tables"],
    queryFn: async (): Promise<ListTablesResponse> => {
      const tables = await fetch("/api/list-tables", {
        method: "POST",
        body: JSON.stringify({
          tableName: "todo",
        }),
        headers: {
          authorization: authUser?.jwt,
        },
      });
      return tables.json();
    },
    // enabled: Boolean(authUser?.jwt),
  });
};

export default function TablesList() {
  const { data: tables } = useListTables();
  const [selectedTable, setSelectedTable] = useState("");

  const addSelectedTable = (table: string) => {
    setSelectedTable(table);
  };
  const removeSelectedTable = () => {
    setSelectedTable("");
  };

  if (selectedTable) {
    return <SelectedTable selectedTable={selectedTable} />;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mt-8">
      {tables?.TableNames?.map((tableName: string) => {
        return (
          <button
            className="p-4 text-2xl hover:scale-110 transition"
            onClick={() => {
              console.log("TODO");
              // alert("TODO");
              addSelectedTable(tableName);
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
