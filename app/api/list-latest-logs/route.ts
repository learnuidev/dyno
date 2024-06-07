import { listLatestLogs } from "@/libs/cloudwatch-logs/list-latest-logs";
import { verifyJwt } from "@/libs/cognito/jwt";
import { listTables } from "@/libs/dynamodb/list-tables";

import { listFunctions } from "@/libs/lambda/list-functions";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { region, logGroupName, filterPattern, logStreamCount } =
    await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });
  // const isVerified = await true;

  if (isVerified) {
    try {
      const logs = await listLatestLogs({
        region,
        logGroupName,
        filterPattern,
        logStreamCount,
      });

      return Response.json(logs);
    } catch (err) {
      console.log("ERROR", err);
      throw new Error("Error");
    }
  } else {
    // return Response.json({
    //   message: "Not authorized",
    // });
    throw new Error("Unauthorized");
  }
}
