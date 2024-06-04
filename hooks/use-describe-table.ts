import { useQuery } from "@tanstack/react-query";

export const useDescribeTable = ({ TableName }: { TableName: string }) => {
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
