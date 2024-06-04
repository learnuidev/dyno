"use client";

import { useState } from "react";
import { SelectedTable } from "./selected-table";
import { useQuery } from "@tanstack/react-query";
import { ListTablesResponse } from "@/libs/dynamodb/list-tables";
import { FilterTablesInput } from "./filter-tables-input";
import { DynoBanner } from "./dyno-banner";
import { TableItem } from "./table-item";

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
      <DynoBanner />

      <section className="flex w-full mt-8">
        <FilterTablesInput query={query} setQuery={setQuery} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 pt-8">
        {filteredTableNames?.map((tableName: string) => {
          return (
            <TableItem
              key={tableName}
              tableName={tableName}
              addSelectedTable={addSelectedTable}
            />
          );
        })}
      </section>
    </main>
  );
}
