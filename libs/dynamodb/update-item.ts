import { dynamoDocumentClient } from "./client";
import { constructParams } from "./utils/construct-params";

export const maxDuration = 60;

export async function updateItem({
  TableName,
  attributes,
}: {
  TableName: string;
  attributes: any;
}) {
  var updatedItems = constructParams({
    tableName: TableName,
    attributes: attributes,
  });

  await dynamoDocumentClient.update(updatedItems).promise();

  return {
    ...attributes,
    updatedAt: Date.now(),
  };
}
