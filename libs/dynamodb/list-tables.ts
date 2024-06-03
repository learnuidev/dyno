import { dynamodb } from "./client";

export const maxDuration = 60;

export type TableName = string;

export interface ListTablesResponse {
  TableNames: TableName[];
}

export async function listTables() {
  const tables = await dynamodb.listTables().promise();
  return tables;
}
