import { listFunctions } from "@/libs/lambda/list-functions";
import { LambdaClient } from "./lambda-client";
import { listTables } from "@/libs/dynamodb/list-tables";

export default async function Lambda() {
  const tables = await listTables();
  const functions = await listFunctions();

  return (
    <main className="dark:text-white">
      <LambdaClient functions={functions} tables={tables} />
    </main>
  );
}
