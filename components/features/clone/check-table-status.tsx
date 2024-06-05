import { StepItem } from "@/components/step-item";
import { useDescribeTable } from "@/hooks/use-describe-table";
import { useEffect, useState } from "react";

export const CheckTableStatus = (props: any) => {
  const {
    newTableName,
    setPreview,

    filteredTableNames,
    addSelectedTable,
    selectedStepTable,
    newTableNameSync,
    setNewTableNameSync,
    setNewTableName,
    attributes,
    setAttributes,
    attributesSync,
    setAttributesSync,
    scannedData,
  } = props;

  const [isCreating, setIsCreating] = useState(false);

  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable(
    {
      TableName: newTableName,
    },
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (tableInfo?.Table?.TableStatus === "ACTIVE") {
      setPreview("populate");
    }
  }, [setPreview, tableInfo]);

  return (
    <StepItem stepNumber={6} title="Creating Table">
      <section className="dark:text-white">
        <h1 className="my-32 text-5xl bont-bold">...</h1>

        {/* <div>{JSON.stringify(previewItems?.[0], null, 2)}</div> */}
      </section>
    </StepItem>
  );
};
