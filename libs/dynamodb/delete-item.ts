import { dynamoDocumentClient } from "./client";

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

  return { ...item, id, deletedAt: Date.now() };
}
