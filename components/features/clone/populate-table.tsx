import { StepItem } from "@/components/step-item";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useDescribeTable } from "@/hooks/use-describe-table";
import { pluck } from "@/lib/utils";
import { useEffect, useState } from "react";

export const PopulateTable = (props: any) => {
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
  const { data: authUser } = useCurrentAuthUser({});

  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable(
    {
      TableName: newTableName,
    },
    {
      refetchInterval: 1000,
    }
  );

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

  useEffect(() => {
    const cloneTable = async () => {
      const cloned = await fetch("/api/bulk-create", {
        method: "POST",
        headers: {
          authorization: authUser?.jwt,
        },
        body: JSON.stringify({
          Items: previewItems,
          TableName: newTableName,
        }),
      });

      if (!cloned.ok) {
        setPreview("done");
      } else {
        setPreview("done");
      }
    };
    cloneTable().then(() => {
      setPreview("done");
    });
  }, [newTableName, previewItems, selectedStepTable, setPreview]);

  return (
    <StepItem stepNumber={7} title="Populating Table">
      <section className="dark:text-white">
        <h1 className="my-32 text-5xl bont-bold">...</h1>
        {/* <div>{JSON.stringify(previewItems?.[0], null, 2)}</div> */}
      </section>
    </StepItem>
  );
};
