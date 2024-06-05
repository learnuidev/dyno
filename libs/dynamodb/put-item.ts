import { transformItem } from "./utils/transform-item";
import { dynamoDocumentClient } from "./client";

export const maxDuration = 60;

export async function putItem({
  TableName,
  Item,
}: {
  TableName: string;
  Item: any;
}) {
  const resp = await dynamoDocumentClient.put({ TableName, Item }).promise();

  return resp;
}
