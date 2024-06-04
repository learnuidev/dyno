import { useDescribeTable } from "@/hooks/use-describe-table";
import { useDynamoDBScan } from "@/hooks/use-scan";
import { DynamoDBTable } from "./table/dynamodb-table";

export const TableData = ({ selectedTable }: { selectedTable: string }) => {
  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedTable,
  });
  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: selectedTable,
  });

  return (
    <section className="h-screen overflow-y-auto">
      {scannedData?.Items && (
        <DynamoDBTable
          TableName={selectedTable}
          tableDescription={tableInfo}
          Items={scannedData?.Items}
          isLoading={isLoading && isInfoLoading}
        />
      )}
    </section>
  );
};
