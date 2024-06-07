import { verifyJwt } from "@/libs/cognito/jwt";
import { listTables } from "@/libs/dynamodb/list-tables";

import { listFunctions } from "@/libs/lambda/list-functions";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { TableName } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });
  // const isVerified = await true;

  if (isVerified) {
    try {
      const functions = await listFunctions();

      let lambdas;

      if (TableName) {
        lambdas = functions?.Functions?.filter((func: any) => {
          return JSON.stringify(func.Environment.Variables)?.includes(
            TableName
          );
        });
      } else {
        lambdas = functions?.Functions;
      }

      return Response.json(lambdas);
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
