import { useQuery } from "@tanstack/react-query";

export const useDynamoDBScan = ({ TableName }: { TableName: string }) => {
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
