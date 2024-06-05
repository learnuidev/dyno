import { pluck } from "@/lib/utils";
import { useEffect, useState } from "react";

export const CloneTable = (props: any) => {
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
      const cloned = await fetch("/api/clone-table", {
        method: "POST",
        body: JSON.stringify({
          Items: previewItems,
          TargetTableName: selectedStepTable,
          NewTableName: newTableName,
        }),
      });

      if (!cloned.ok) {
        setPreview("check-table");
      } else {
        setPreview("check-table");
      }
    };
    cloneTable().then(() => {
      setPreview("check-table");
    });
  }, [newTableName, previewItems, selectedStepTable, setPreview]);

  return (
    <div className="my-16 flex items-center justify-center flex-col">
      <div>
        <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
          5
        </p>
      </div>
      <h2 className="text-center text-gray-200 text-2xl font-light">
        Creating table
      </h2>

      <section className="dark:text-white">
        <code>
          <pre>{JSON.stringify({}, null, 2)}</pre>
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
    </div>
  );
};
