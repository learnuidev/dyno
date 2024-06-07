// import { dynamodb } from "./client";

import { lambda } from "./client";

export const maxDuration = 60;

export async function listFunctions() {
  const resp = await lambda.listFunctions().promise();

  return resp;
}
