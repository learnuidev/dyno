import { useQuery } from "@tanstack/react-query";

const useDynamoDBScan = ({ TableName }: { TableName: string }) => {
  // const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["scan", TableName],
    queryFn: async () => {
      const tables = await fetch("/api/scan", {
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

export const TableData = ({ selectedTable }: { selectedTable: string }) => {
  const { data: scannedData } = useDynamoDBScan({ TableName: selectedTable });

  return (
    <code>
      <pre>{JSON.stringify(scannedData, null, 2)}</pre>
    </code>
  );
};
