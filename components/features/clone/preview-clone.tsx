import { StepItem } from "@/components/step-item";
import { useDescribeTable } from "@/hooks/use-describe-table";
import { useGetMandatoryAttributes } from "@/hooks/use-get-mandatory-attributes";
import { useGetPrimaryKey } from "@/hooks/use-get-primary-key";
import { useDynamoDBScan } from "@/hooks/use-scan";
import { pluck } from "@/lib/utils";
import { useState } from "react";

export const PreviewClone = (props: any) => {
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
  } = props;
  const [isCreating, setIsCreating] = useState(false);
  const [query, setQuery2] = useState("");

  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: selectedStepTable,
  });

  const mandatoryKeys = useGetMandatoryAttributes(selectedStepTable) || [];
  const primaryKey = useGetPrimaryKey(selectedStepTable) || [];

  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedStepTable,
  });

  const attributesList = [
    ...(new Set(
      scannedData?.map((item: any) => Object.keys(item)).flat()
    ) as any),
  ]?.filter((item) => !Number.isFinite(parseInt(item)));

  const previewItems = scannedData?.map((item: any) => {
    // return item;
    // return attributes;
    const init = pluck(item, attributes) as any;

    return {
      ...init,
      id: crypto.randomUUID(),
      // parentId: init?.[primaryKey],
    };
  });

  return (
    <StepItem stepNumber={4} title="Preview">
      <section className="dark:text-white">
        <code>
          <pre>{JSON.stringify(previewItems?.[0], null, 2)}</pre>
        </code>
        {/* <div>{JSON.stringify(previewItems?.[0], null, 2)}</div> */}
      </section>

      <div className="mt-32">
        <button
          onClick={() => {
            setPreview("clone");
            // alert("create");
          }}
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </div>
    </StepItem>
  );
};
