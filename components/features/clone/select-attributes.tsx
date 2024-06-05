import { FilterTablesInput } from "@/components/filter-tables-input";

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

  const mandatoryKeys = useGetMandatoryAttributes(selectedStepTable) || [];

  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedStepTable,
  });

  const attributesList = [
    ...(new Set(
      scannedData?.Items.map((item: any) => Object.keys(item)).flat()
    ) as any),
  ]?.filter((item) => !Number.isFinite(parseInt(item)));

  return (
    <div className="my-16 flex items-center justify-center flex-col">
      <div className="mb-8">
        <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
          3
        </p>
      </div>
      <h2 className="text-center text-gray-200 text-2xl font-light">
        Please select the attributes
      </h2>

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
        <h1 className="text-xl text-gray-300 text-center"> Attributes</h1>

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

        <div>
          <button
            onClick={() => {
              setAttributes([...attributesSync, ...mandatoryKeys]);
            }}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
};
