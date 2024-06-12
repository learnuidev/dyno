import { verifyJwt } from "@/libs/cognito/jwt";
import { createTable } from "@/libs/dynamodb/create-table";
import { describeTable } from "@/libs/dynamodb/describe-table";
import { putItem } from "@/libs/dynamodb/put-item";
import { scan } from "@/libs/dynamodb/scan";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { TargetTableName, NewTableName: newName } = await req.json();

  const NewTableName = `${newName}`;

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });
  // const isVerified = await true;

  if (isVerified) {
    const resp = await describeTable({ TableName: TargetTableName });

    try {
      const clonedName = await createTable({
        TableName: NewTableName,
        KeySchema: resp?.Table?.KeySchema,
        AttributeDefinitions: resp?.Table?.AttributeDefinitions,
        BillingMode: resp?.Table?.BillingModeSummary?.BillingMode,
        StreamSpecification: resp?.Table?.StreamSpecification,
        // StreamEnabled: !!resp?.Table?.StreamSpecification?.StreamEnabled,
        StreamEnabled: false,
        GlobalSecondaryIndexes: resp?.Table?.GlobalSecondaryIndexes?.map(
          (gsi) => {
            return {
              IndexName: gsi.IndexName,
              KeySchema: gsi.KeySchema,
              Projection: gsi.Projection,
            };
          }
        ),
      });

      return Response.json({
        message: `${TargetTableName} successfully cloned`,
      });
    } catch (err) {
      console.log("Successfully createda new table: now writing");
      throw err;
    }
  } else {
    // return Response.json({
    //   message: "Not authorized",
    // });
    throw new Error("Unauthorized");
  }
}
