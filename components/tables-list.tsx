"use client";

import { useState } from "react";
import { SelectedTable } from "./selected-table";
import { useQuery } from "@tanstack/react-query";
import { ListTablesResponse } from "@/libs/dynamodb/list-tables";
import { FilterTablesInput } from "./filter-tables-input";
import { DynoBanner } from "./dyno-banner";
import { TableItem } from "./table-item";
import { Feature, features } from "@/lib/features";
import { Features } from "./features/features";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetTask } from "@/hooks/use-get-task";

export const useListTables = () => {
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
  const router = useRouter();

  const addSelectedTable = (table: string) => {
    router.push(`/?table=${table}`);
    // setSelectedTable(table);
  };

  // Features
  const Feature = Features?.[query];

  const searchParams = useSearchParams();

  const tableParams = searchParams.get("table");

  if (tableParams) {
    return (
      <main className="dark:bg-black dark:text-white">
        <SelectedTable selectedTable={tableParams} />
      </main>
    );
  }

  if (Feature) {
    return (
      <main className="dark:bg-black dark:text-white h-screen">
        <Feature setQuery={setQuery} />
      </main>
    );
  }

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

  const filteredFeatures = features.filter((feature) => {
    if (!query) {
      return false;
    }
    return JSON.stringify(feature)
      ?.toLowerCase()
      ?.includes(query?.toLowerCase());
  });

  return (
    <main className="dark:bg-black dark:text-white h-screen overflow-y-auto">
      <DynoBanner />

      <section className="flex w-full mt-8">
        <FilterTablesInput query={query} setQuery={setQuery} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 pt-8">
        {filteredFeatures?.map((feature: Feature) => {
          return (
            <TableItem
              key={feature?.id}
              description={feature?.description}
              tableName={feature?.title}
              addSelectedTable={(featureTitle) => {
                const feature = features?.find(
                  (feature) => feature.title === featureTitle
                );
                feature?.id && setQuery(feature?.id);
              }}
            />
          );
        })}
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
