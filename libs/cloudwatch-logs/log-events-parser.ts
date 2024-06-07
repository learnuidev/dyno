const logEventParser = (event: any) => {
  const eventMessage = event.message?.toLowerCase();

  if (eventMessage?.includes("init_start")) {
    return {
      type: "init-start",
      requestId: `dyno#${crypto.randomUUID()}`,
      message: eventMessage,
      event,
    };
  }
  if (eventMessage?.includes("start")) {
    const [requestIdRaw] = event.message
      .split("\n")
      .join("")
      .split("\t")
      .filter(Boolean);

    const [, , requestId] = requestIdRaw?.split(" ");

    return {
      type: "start",
      requestId,
      message: eventMessage,
      ...event,
    };
  }

  if (eventMessage?.includes("report")) {
    const [
      requestIdRaw,
      durationRaw,
      billedDurationRaw,
      memoryRaw,
      maxMemoryUsed,
    ] = event.message.split("\n").join("").split("\t").filter(Boolean);

    const [, , requestId] = requestIdRaw?.split(" ");
    const [, duration] = durationRaw?.split(" ");
    const [, , billedDuration] = billedDurationRaw?.split(" ");
    const [, , memory] = memoryRaw?.split(" ");
    const [, , , memoryUsed] = maxMemoryUsed?.split(" ");
    return {
      type: "report",
      ...event,
      duration: duration.trim(),
      billedDuration: billedDuration.trim(),
      memorySize: memory.trim(),
      memoryUsed: memoryUsed.trim(),
      message: eventMessage,
      requestId: requestId.trim(),

      // event,
    };
  }

  if (eventMessage?.includes("info")) {
    const [timeStamp, requestId, info, val] = event.message
      .split("\n")
      .join("")
      .split("\t")
      .filter(Boolean);

    return {
      type: "info",
      requestId,
      value: val,
      message: eventMessage,
      ...event,
    };
  }

  if (eventMessage?.includes("end")) {
    const [requestIdRaw] = event.message
      .split("\n")
      .join("")
      .split("\t")
      .filter(Boolean);

    const [, , requestId] = requestIdRaw?.split(" ");

    return {
      type: "end",
      requestId,
      message: eventMessage,

      ...event,
    };
  }

  if (eventMessage?.includes("error")) {
    try {
      const [time, requestId, err, errorType, errorObj] =
        event?.message?.split("\t");
      return {
        type: "error",
        message: event.message,

        createdAt: time,
        requestId: requestId.trim(),
        errorType: errorType?.trim(),
        errorObject: errorObj,
        ...event,

        //   event,
      };
    } catch (err) {
      return {
        type: "error",
        message: eventMessage,
        ...event,
      };
    }
  }
};

export const logEventsParser = (events: any) => {
  return events
    .map(logEventParser)
    ?.sort((a: any, b: any) => b?.timestamp - a?.timestamp);
};
