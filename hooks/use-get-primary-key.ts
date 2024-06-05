import { useDescribeTable } from "@/hooks/use-describe-table";

export const useGetPrimaryKey = (tableName: string) => {
  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: tableName,
  });

  const primaryKey = tableInfo?.Table?.KeySchema?.find(
    (attr) => attr?.KeyType === "HASH"
  )?.AttributeName;

  return primaryKey as any;
};
