import { DisplayIf } from "@/components/display-if";
import { FilterTablesInput } from "@/components/filter-tables-input";
import { StepItem } from "@/components/step-item";
import { TableItem } from "@/components/table-item";
import { useListTables } from "@/components/tables-list";

export const NewTableName = (props: any) => {
  const {
    newTableName,
    query,
    setQuery2,
    // filteredTableNames,
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

  const newTimeStamp = Date.now();

  const suggestions = [newTableNameSync, "clone"]
    .filter(Boolean)
    .map((item) => {
      return `${selectedStepTable}-${newTimeStamp}-${item}`;
    });

  const { data: tables } = useListTables();

  const filteredTableNames = tables?.TableNames?.filter((name) => {
    if (!query) {
      return false;
    }
    return name?.toLowerCase()?.includes(newTableNameSync?.toLowerCase());
  });

  return (
    <StepItem
      stepNumber={2}
      title="Name your table"
      // description="Please give your table a new name"
    >
      <section className="flex w-full mt-8">
        <FilterTablesInput
          placeholder={"my-awesome-table"}
          query={newTableNameSync}
          setQuery={setNewTableNameSync}
        />
      </section>

      <section className="mt-16">
        <h1 className="text-xl text-gray-600 text-center"> Suggestions</h1>

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
      <section className="mt-16">
        <h1 className="text-xl text-gray-600 text-center">
          {" "}
          or select existing table
        </h1>

        <DisplayIf variant="autenticated">
          <section className="grid grid-cols-1 sm:grid-cols-2 pt-8">
            {filteredTableNames?.map((tableName: string) => {
              return (
                <TableItem
                  key={tableName}
                  tableName={tableName}
                  addSelectedTable={(table) => {
                    setNewTableName(table);
                  }}
                />
              );
            })}
          </section>
        </DisplayIf>
      </section>
    </StepItem>
  );
};
