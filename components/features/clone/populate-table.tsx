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

  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable(
    {
      TableName: newTableName,
    },
    {
      refetchInterval: 1000,
    }
  );

  const previewItems = scannedData?.Items?.map((item: any) => {
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
    <div className="my-16 flex items-center justify-center flex-col">
      <div>
        <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
          7
        </p>
      </div>
      <h2 className="text-center text-gray-200 text-2xl font-light">
        Populating Table
      </h2>

      <section className="dark:text-white">
        <code>
          <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
        </code>
        {/* <div>{JSON.stringify(previewItems?.[0], null, 2)}</div> */}
      </section>
    </div>
  );
};
