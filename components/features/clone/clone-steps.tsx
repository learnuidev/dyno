import { FilterTablesInput } from "@/components/filter-tables-input";
import { TableItem } from "@/components/table-item";

import { useDynamoDBScan } from "@/hooks/use-scan";

import { SelectAttributes } from "./select-attributes";
import { PreviewClone } from "./preview-clone";
import { CloneTable } from "./clone-table";
import { CheckTableStatus } from "./check-table-status";
import { PopulateTable } from "./populate-table";
import { CloneSuccess } from "./clone-success";

export const CloneSteps = (props: any) => {
  const {
    newTableName,
    query,
    setQuery2,
    filteredTableNames,
    addSelectedTable,
    selectedStepTable,
    newTableNameSync,
    setNewTableNameSync,
    setNewTableName,
    attributes,
    preview,
    setAttributes,
    attributesSync,
    setAttributesSync,
  } = props;

  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedStepTable,
  });

  // First step: Table Selection
  if (!selectedStepTable) {
    return (
      <div className="my-16 flex items-center justify-center flex-col">
        <div className="mb-8">
          <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
            1
          </p>
        </div>
        <h2 className="text-center text-gray-200 text-2xl font-light">
          Please select a table that you would like to clone
        </h2>

        <section className="flex w-full mt-8">
          <FilterTablesInput
            placeholder={"search tables"}
            query={query}
            setQuery={setQuery2}
          />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 pt-8">
          {filteredTableNames?.map((tableName: string) => {
            return (
              <TableItem
                key={tableName}
                tableName={tableName}
                addSelectedTable={addSelectedTable}
              />
            );
          })}
        </section>
      </div>
    );
  }

  // Second Step: Naming
  const newTimeStamp = Date.now();
  if (!newTableName) {
    const suggestions = [newTableNameSync, "clone"]
      .filter(Boolean)
      .map((item) => {
        return `${selectedStepTable}-${newTimeStamp}-${item}`;
      });
    return (
      <div className="my-16 flex items-center justify-center flex-col">
        <div className="mb-8">
          <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
            2
          </p>
        </div>
        <h2 className="text-center text-gray-200 text-2xl font-light">
          Please give your table a new name
        </h2>

        <section className="flex w-full mt-8">
          <FilterTablesInput
            placeholder={"my-awesome-table"}
            query={newTableNameSync}
            setQuery={setNewTableNameSync}
          />
        </section>

        <section className="mt-16">
          <h1 className="text-xl text-gray-400 text-center"> Suggestions</h1>

          <div className="space-y-2 mt-8">
            {suggestions?.map((suggestion) => (
              <div
                onClick={() => {
                  setNewTableName(suggestion);
                }}
                key={suggestion}
                className="space-y-4 text-gray-300"
              >
                <button>{suggestion}</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Select Attributes
  if (!attributes?.length) {
    return <SelectAttributes {...props} />;
  }

  // Preview Step
  if (preview === "review") {
    return <PreviewClone {...props} />;
  }

  if (preview === "clone") {
    return <CloneTable {...props} scannedData={scannedData} />;
  }
  if (preview === "check-table") {
    return <CheckTableStatus {...props} scannedData={scannedData} />;
  }
  if (preview === "populate") {
    return <PopulateTable {...props} scannedData={scannedData} />;
  }
  if (preview === "done") {
    return <CloneSuccess {...props} scannedData={scannedData} />;
  }
};
