import { dynamoDocumentClient } from "./client";
import { constructParams } from "./utils/construct-params";

export const maxDuration = 60;

export async function deleteItem({
  TableName,
  id,
}: {
  TableName: string;
  id: any;
}) {
  const item = await dynamoDocumentClient
    .delete({
      Key: {
        id: id,
      },
      TableName,
    })
    .promise();

  return Response.json({ ...item, deletedAt: Date.now() });
}
