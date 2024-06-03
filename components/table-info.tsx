import { useQuery } from "@tanstack/react-query";

const useDescribeTable = ({ TableName }: { TableName: string }) => {
  // const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["describe-table", TableName],
    queryFn: async () => {
      const tables = await fetch("/api/describe-table", {
        method: "POST",
        body: JSON.stringify({
          TableName: TableName,
        }),
        headers: {
          // authorization: authUser?.jwt,
          authorization: "",
        },
      });
      return tables.json();
    },
    // enabled: Boolean(authUser?.jwt),
  });
};

export const TableInfo = ({ selectedTable }: { selectedTable: string }) => {
  const { data: tableInfo } = useDescribeTable({ TableName: selectedTable });
  return (
    <code>
      <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
    </code>
  );
};
