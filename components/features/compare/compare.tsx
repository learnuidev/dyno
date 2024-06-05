import { useGetTableId } from "@/hooks/use-get-table-id";
import { useState } from "react";
import { SelectComparisonTables } from "./select-comparison-tables";
import { ICompare } from "./compare.types";
import { CompareTables } from "./compare-tables";
import { useGetParentTableName } from "@/hooks/use-get-parent-table";
import { useListTables } from "@/components/tables-list";
import { useRouter } from "next/navigation";
import { SelectTable } from "@/components/table/select-table";

export const Compare = () => {
  const tableId = useGetTableId();
  const { data: tables } = useListTables();
  const router = useRouter();

  const [query, setQuery2] = useState("");

  const parentTableId = useGetParentTableName(tableId);

  const [compareState, setCompareState] = useState<ICompare>({
    table: tableId,
    targetTables: [parentTableId]?.filter(Boolean),
    status: "select-tables",
  });

  const addSelectedTable = (table: string) => {
    router.push(`/?table=${table}&task=compare`);
  };

  const filteredTableNames = tables?.TableNames?.filter((name) => {
    if (!query) {
      return false;
    }
    return name?.toLowerCase()?.includes(query?.toLowerCase());
  });

  if (!tableId) {
    return (
      <SelectTable
        query={query}
        setQuery2={setQuery2}
        filteredTableNames={filteredTableNames}
        addSelectedTable={addSelectedTable}
      />
    );
  }

  if (parentTableId) {
    return (
      <CompareTables
        compareState={compareState}
        setCompareState={setCompareState}
      />
    );
  }

  if (compareState.status === "select-tables") {
    return <SelectComparisonTables setCompareState={setCompareState} />;
  }
  if (compareState.status === "done") {
    return (
      <CompareTables
        compareState={compareState}
        setCompareState={setCompareState}
      />
    );
  }

  return <div> COMPARE </div>;
};
