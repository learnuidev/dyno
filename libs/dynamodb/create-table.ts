import { transformItem } from "./utils/transform-item";
import { dynamodb } from "./client";
import { removeNull } from "@/lib/utils";

export const maxDuration = 60;

export async function createTable(createTableParams: any) {
  const {
    TableName,
    KeySchema,
    AttributeDefinitions,
    BillingMode,
    Tags,
    StreamSpecification,
    GlobalSecondaryIndexes,
  } = createTableParams;

  const resp = await dynamodb
    .createTable(removeNull(createTableParams) as any)
    .promise();

  return resp;
}
