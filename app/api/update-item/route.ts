import { verifyJwt } from "@/libs/cognito/jwt";
import { updateItem } from "@/libs/dynamodb/update-item";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { TableName, attributes } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });
  // const isVerified = await true;

  if (isVerified) {
    try {
      const updatedItem = await updateItem({ TableName, attributes });

      return Response.json(updatedItem);
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
