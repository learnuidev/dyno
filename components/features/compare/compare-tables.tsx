import { StepItem } from "../../step-item";
import { ICompare } from "./compare.types";
import { useCompareTables } from "./use-compare-tables";

export const CompareTables = (props: {
  compareState: ICompare;
  setCompareState: React.Dispatch<React.SetStateAction<ICompare>>;
}) => {
  const { data: results, isLoading } = useCompareTables(props.compareState);

  return (
    <StepItem
      stepNumber={1}
      title={isLoading ? "Comparing..." : "Results"}
      description={isLoading ? "This will take few sections" : ""}
    >
      {results.added?.length > 0 && (
        <>
          <section>
            <h1>
              {results.added?.length}{" "}
              {results.added?.length === 1 ? "item" : "items"} added
            </h1>
          </section>

          <section>
            <code>
              <pre>{JSON.stringify(results.added, null, 2)}</pre>
            </code>
          </section>

          <section className="mt-8">
            <button
              onClick={() => {
                alert("sync table");
              }}
              className="dark:hover:text-white hover:shadow-sm shadow-sm shadow-emerald-300 hover:shadow-emerald-400 transition px-6 py-2 rounded-full dark:bg-black dark:text-gray-400"
            >
              {" "}
              Sync{" "}
            </button>
          </section>
        </>
      )}
    </StepItem>
  );
};