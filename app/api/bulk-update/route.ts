import { verifyJwt } from "@/libs/cognito/jwt";

import { putItem } from "@/libs/dynamodb/put-item";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { TableName, Items } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });
  // const isVerified = await true;

  if (isVerified) {
    try {
      const createdItems = await Promise.all(
        Items?.map(async (item: any) => {
          const newItem = await putItem({
            TableName: TableName,
            Item: item,
          });

          return newItem;
        })
      );
      return Response.json({
        message: `${TableName} populated successfully`,
        items: createdItems,
      });
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
