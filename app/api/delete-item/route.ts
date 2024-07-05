import { verifyJwt } from "@/libs/cognito/jwt";
import { deleteItem } from "@/libs/dynamodb/delete-item";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { TableName, id } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    try {
      const updatedItem = await deleteItem({ TableName, id });

      return Response.json(updatedItem);
    } catch (err) {
      console.log("ERROR", err);
      throw new Error("Error");
    }
  } else {
    throw new Error("Unauthorized");
  }
}
