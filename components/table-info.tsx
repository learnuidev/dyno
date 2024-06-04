import { useDescribeTable } from "@/hooks/use-describe-table";
import { formatTableName } from "@/lib/utils";

const bytesToMB = (byte: number) => byte * 0.000001;

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
          <div className="flex space-x-2 items-center">
            <h3 className="font-extralight text-gray-400">
              {bytesToMB(tableInfo?.Table?.TableSizeBytes || 0)?.toFixed(1)} MB
            </h3>

            <p> | </p>

            <h5 className="font-extralight text-gray-400">
              {tableInfo?.Table?.ItemCount} items
            </h5>
          </div>
        </div>
      </div>

      {/* <code>
        <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
      </code> */}
    </section>
  );
};
