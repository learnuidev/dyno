import { TablesList } from "@/components/tables-list";
import { listTables, ListTablesResponse } from "@/libs/dynamodb/list-tables";

export default async function Home() {
  const tables = (await listTables()) as ListTablesResponse;
  return (
    <main className="mt-32 text-center">
      <h1 className="text-7xl">dyno</h1>
      <h1 className="text-3xl mt-8 font-extralight text-gray-400">
        dynamodb client from the future
      </h1>

      <TablesList tables={tables} />

      {/* <section>
        <code>
          <pre>{JSON.stringify(tables.TableNames, null, 2)}</pre>
        </code>
      </section> */}
    </main>
  );
}
