import { ICompare } from "./compare.types";
import { useDynamoDBScan } from "@/hooks/use-scan";

export const useCompareTables = (compareState: ICompare) => {
  const { data: originTable, isLoading } = useDynamoDBScan({
    TableName: compareState?.targetTables?.[0],
  });
  const { data: tableData, isLoading: isLoadingB } = useDynamoDBScan({
    TableName: compareState?.table,
  });

  const diff = originTable?.length - tableData?.length;

  const itemsAdded = originTable?.filter((item: any) => {
    const oldData = tableData?.filter(
      (data: any) => data?.hanzi === item?.hanzi
    );
    return oldData?.length === 0;
  });

  return {
    isLoading: isLoading || isLoadingB,
    data: { added: itemsAdded, diff: isNaN(diff) ? 0 : diff },
  };
};
