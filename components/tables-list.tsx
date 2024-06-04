"use client";

import { useState } from "react";
import { SelectedTable } from "./selected-table";
import { useQuery } from "@tanstack/react-query";
import { ListTablesResponse } from "@/libs/dynamodb/list-tables";
import { FilterTablesInput } from "./filter-tables-input";

export const formatTableName = (tableName: string) => {
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
  const [query, setQuery] = useState("");

  const addSelectedTable = (table: string) => {
    setSelectedTable(table);
  };

  if (selectedTable) {
    return (
      <main className="dark:bg-black dark:text-white">
        <SelectedTable selectedTable={selectedTable} />
      </main>
    );
  }

  const filteredTableNames = tables?.TableNames?.filter((name) => {
    if (!query) {
      return false;
    }
    return name?.toLowerCase()?.includes(query?.toLowerCase());
  });

  return (
    <main className="dark:bg-black dark:text-white h-screen overflow-y-auto">
      <div className="pt-32 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">dyno</h1>
        <h1 className="text-xl md:text-3xl mx-8 mt-4 md:mt-8 font-extralight text-gray-400">
          delightful dynamodb client from the future
        </h1>
      </div>

      <section className="flex w-full">
        <FilterTablesInput query={query} setQuery={setQuery} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 pt-8">
        {filteredTableNames?.map((tableName: string) => {
          return (
            <div key={tableName} className="p-4 flex items-center flex-col">
              <button
                className="text-2xl hover:scale-110 transition"
                onClick={() => {
                  addSelectedTable(tableName);
                }}
              >
                <span>{formatTableName(tableName)}</span>
              </button>

              <p className="text-[10px] text-gray-400">{tableName}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
