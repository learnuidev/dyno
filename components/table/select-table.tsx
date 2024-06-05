import { FilterTablesInput } from "@/components/filter-tables-input";
import { StepItem } from "@/components/step-item";
import { TableItem } from "@/components/table-item";

export const SelectTable = (props: any) => {
  const { query, setQuery2, filteredTableNames, addSelectedTable } = props;

  return (
    <StepItem
      stepNumber={1}
      title="Select Table"
      description=" Please select a table that you would like to clone"
    >
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
    </StepItem>
  );
};
