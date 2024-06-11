import { FilterTablesInput } from "@/components/filter-tables-input";
import { StepItem } from "@/components/step-item";

import { useDescribeTable } from "@/hooks/use-describe-table";
import { useGetMandatoryAttributes } from "@/hooks/use-get-mandatory-attributes";

import { useDynamoDBScan } from "@/hooks/use-scan";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SelectAttributes = ({
  newTableName,

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
}: any) => {
  const [query, setQuery2] = useState("");

  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: selectedStepTable,
  });

  const mandatoryKeysTarget =
    useGetMandatoryAttributes(selectedStepTable) || [];

  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedStepTable,
  });

  const mandatoryKeysNew = useGetMandatoryAttributes(newTableName) || [];

  const mandatoryKeys =
    mandatoryKeysNew?.length > 0 ? mandatoryKeysNew : mandatoryKeysTarget;

  const attributesList = [
    ...(new Set(
      scannedData?.map((item: any) => Object.keys(item)).flat()
    ) as any),
  ]?.filter((item) => !Number.isFinite(parseInt(item)));

  return (
    <StepItem
      stepNumber={3}
      title="Select Attributes"
      description="Please select the attributes"
      className="relative"
    >
      <section className="flex w-full mt-8">
        <FilterTablesInput
          placeholder={"search attributes"}
          query={query}
          setQuery={setQuery2}
        />
      </section>

      {/* <section>
        <code>
          <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
        </code>
      </section> */}

      <section className="mt-16">
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-2xl gap-6">
          {attributesList?.map((attribute) => (
            <div
              onClick={() => {
                setAttributesSync((prev: any) => {
                  if (prev?.includes(attribute)) {
                    return prev?.filter((v: any) => v !== attribute);
                  } else {
                    return prev.concat(attribute);
                  }
                });
                // setNewTableName(attribute);
              }}
              key={attribute}
              className={cn(
                "transition",
                "space-y-4",

                mandatoryKeys?.includes(attribute)
                  ? "text-rose-400"
                  : query && attribute?.includes(query)
                    ? "text-gray-300"
                    : attributesSync?.includes(attribute)
                      ? "text-gray-300"
                      : "text-gray-600"
              )}
            >
              <div className="flex flex-col items-center">
                <button>{attribute}</button>
                {mandatoryKeys?.includes(attribute) ? (
                  <p className="text-sm"> mandatory </p>
                ) : attributesSync?.includes(attribute) ? (
                  <p className="text-sm"> selected </p>
                ) : (
                  <p className="text-sm dark:text-black text-white"> select </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex w-full fixed z-50 bottom-4">
        <div className="flex items-center w-full justify-center">
          <div></div>
          <button
            className="dark:hover:text-white hover:shadow-sm shadow-sm shadow-emerald-300 hover:shadow-emerald-400 transition px-4  py-2 rounded-full dark:bg-black dark:text-gray-400"
            onClick={() => {
              setAttributes([...attributesSync, ...mandatoryKeys]);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </StepItem>
  );
};
