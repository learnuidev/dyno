import { useGetTableId } from "@/hooks/use-get-table-id";
import { StepItem } from "../../step-item";
import { useListTables } from "../../tables-list";
import { ICompare } from "./compare.types";

export const SelectComparisonTables = (props: {
  setCompareState: React.Dispatch<React.SetStateAction<ICompare>>;
}) => {
  const tableId = useGetTableId();
  const { data: tables } = useListTables();

  const recommendedTable =
    tables?.TableNames?.filter((tableName) =>
      tableId?.includes(tableName)
    )[0] || "";

  return (
    <StepItem
      stepNumber={1}
      title="Select Tables"
      description="please select one or more tables that you would like to compare"
    >
      <section>
        <button
          onClick={() => {
            props?.setCompareState((prev) => ({
              ...prev,

              targetTables: [recommendedTable],
              status: "done",
            }));
          }}
        >
          {recommendedTable}
        </button>
      </section>
    </StepItem>
  );
};
