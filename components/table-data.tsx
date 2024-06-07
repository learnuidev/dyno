import { useDescribeTable } from "@/hooks/use-describe-table";
import { useDynamoDBScan } from "@/hooks/use-scan";
import { DynamoDBTable } from "./table/dynamodb-table";
import { useEffect, useState } from "react";

export const TableData = ({ selectedTable }: { selectedTable: string }) => {
  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedTable,
  });
  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: selectedTable,
  });

  const [items, setItems] = useState(scannedData);

  useEffect(() => {
    if (scannedData) {
      setItems(scannedData);
    }
  }, [scannedData]);

  return (
    <section className="h-screen overflow-y-auto">
      {scannedData?.length > 0 && (
        <DynamoDBTable
          TableName={selectedTable}
          tableDescription={tableInfo}
          // Items={smartData}
          Items={items}
          setItems={setItems}
          isLoading={isLoading && isInfoLoading}
        />
      )}
    </section>
  );
};
