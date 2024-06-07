import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";

export const useListFunctions = ({ TableName }: { TableName: string }) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["scan", TableName],
    queryFn: async () => {
      const lambdas = await fetch("/api/list-functions", {
        method: "POST",
        body: JSON.stringify({
          TableName: TableName,
        }),
        headers: {
          authorization: authUser?.jwt,
        },
      });
      return lambdas.json();
    },
    enabled: Boolean(authUser?.jwt),
  });
};
