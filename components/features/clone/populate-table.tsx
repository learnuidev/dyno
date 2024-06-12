import { StepItem } from "@/components/step-item";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useDescribeTable } from "@/hooks/use-describe-table";
import { pluck } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { listPreviewItems } from "./list-preview-items";

const useBulkCreateQuery = (params: any) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["bulk-create"],

    queryFn: async () => {
      const bulkCreated = await fetch("/api/bulk-create", {
        method: "POST",
        headers: {
          authorization: authUser?.jwt,
        },
        body: JSON.stringify({
          Items: params.previewItems,
          TableName: params.newTableName,
        }),
      });

      if (!bulkCreated.ok) {
        throw new Error("Error");
      }

      return bulkCreated.json();
    },

    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

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
    attributesV2,
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

  const previewItems = listPreviewItems({
    data: scannedData,
    attributes,
    attributesV2: attributesV2,
  });

  useEffect(() => {
    if (!isCreating) {
      setIsCreating(true);
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
    }
  }, []);

  return (
    <StepItem stepNumber={7} title="Populating Table">
      <section className="dark:text-white">
        <h1 className="my-32 text-5xl bont-bold">...</h1>
        {/* <div>{JSON.stringify(previewItems?.[0], null, 2)}</div> */}
      </section>
    </StepItem>
  );
};
