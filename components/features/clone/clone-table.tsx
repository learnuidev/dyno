import { StepItem } from "@/components/step-item";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
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
  const { data: authUser } = useCurrentAuthUser({});

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
      const cloned = await fetch("/api/clone-table", {
        method: "POST",
        headers: {
          authorization: authUser?.jwt,
        },
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
    <StepItem stepNumber={5} title="Creating table">
      <section className="dark:text-white">
        <h1 className="my-32 text-5xl bont-bold">...</h1>

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
