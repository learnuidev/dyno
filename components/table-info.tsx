import { useQuery } from "@tanstack/react-query";
import { formatTableName } from "./tables-list";

const bytesToMB = (byte: number) => byte * 0.000001;

const useDescribeTable = ({ TableName }: { TableName: string }) => {
  // const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["describe-table", TableName],
    queryFn: async () => {
      const tables = await fetch("/api/describe-table", {
        method: "POST",
        body: JSON.stringify({
          TableName: TableName,
        }),
        headers: {
          // authorization: authUser?.jwt,
          authorization: "",
        },
      });
      return tables.json();
    },
    // enabled: Boolean(authUser?.jwt),
  });
};

export const TableInfo = ({ selectedTable }: { selectedTable: string }) => {
  const { data: tableInfo } = useDescribeTable({ TableName: selectedTable });

  return (
    <section className="mx-4 h-screen">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl">
            {" "}
            {formatTableName(tableInfo?.Table?.TableName)}
          </h1>
          <h2 className="font-extralight text-gray-400 my-2">
            {selectedTable}
          </h2>
        </div>

        <div>
          <h4 className="text-gray-500">{tableInfo?.Table?.TableStatus}</h4>
          <h3 className="text-xl font-extralight text-gray-400 my-2">
            {bytesToMB(tableInfo?.Table?.TableSizeBytes || 0)?.toFixed(1)} MB
          </h3>
        </div>
      </div>

      {/* <code>
        <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
      </code> */}
    </section>
  );
};
