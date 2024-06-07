import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { logEventsParser } from "@/libs/cloudwatch-logs/log-events-parser";
import { useQuery } from "@tanstack/react-query";

export const listLatestLogsQueryId = "list-latest-logs";
export const useListLatestLogs = ({
  logGroupName,
}: {
  logGroupName: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: [listLatestLogsQueryId, logGroupName],
    queryFn: async () => {
      const lambdas = await fetch("/api/list-latest-logs", {
        method: "POST",
        body: JSON.stringify({
          logGroupName,
        }),
        headers: {
          authorization: authUser?.jwt,
        },
      });
      const logsJson = await lambdas.json();

      try {
        // @ts-ignore
        window.logs = {
          // @ts-ignore
          ...window.logs,
          [logGroupName]: logEventsParser(logsJson?.logEvents?.events),
        };
      } catch (err) {}
      return Object.groupBy(
        logEventsParser(logsJson?.logEvents?.events),
        (x: any) => x.requestId
      );

      // return {
      //   ...logsJson,
      //   parsed: logEventsParser(logsJson?.logEvents?.events),
      // };
    },
    enabled: Boolean(authUser?.jwt),
  });
};
