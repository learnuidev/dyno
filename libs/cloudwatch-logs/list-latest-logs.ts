// Middlewares

import { removeNull } from "@/lib/utils";
import { cloudwatchLogs } from "./client";

export const listLatestLogs = async ({
  region,
  logGroupName,
  filterPattern,
  logStreamCount,
}: any) => {
  const streams = (await cloudwatchLogs
    .describeLogStreams(
      removeNull({
        logGroupName: logGroupName,
        descending: true,
        limit: 50,
        orderBy: "LastEventTime",
      })
    )
    .promise()) as any;

  if (streams.logStreams.length > 0) {
    const maxStreamCount = Math.min(logStreamCount || 1, 10);
    const logStreamNames = streams.logStreams
      .map((stream: any) => stream.logStreamName)
      .slice(0, maxStreamCount);

    const params = removeNull({
      logGroupName: logGroupName,
      limit: 50,
      filterPattern,
      logStreamNames,
    });

    const logEvents = (await cloudwatchLogs
      .filterLogEvents(params)
      .promise()) as any;

    logEvents.events.reverse();

    return {
      // streams,
      logEvents,
    };
  } else {
    return {
      streams,
      logEvents: [],
    };
  }
};
