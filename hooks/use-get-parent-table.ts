import { useListTables } from "@/components/tables-list";
import { useGetTableId } from "./use-get-table-id";

export const useGetParentTableName = (tableId: string) => {
  // const tableId = useGetTableId();
  const { data: tables } = useListTables();

  const parentTable =
    tables?.TableNames?.filter((tableName) =>
      tableId?.includes(tableName)
    )[0] || "";

  return parentTable;
};
