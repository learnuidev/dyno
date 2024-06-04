import { cn } from "@/lib/utils";

export const FilterTablesInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      className={cn(
        // 1. layout
        "w-full h-12 mx-2 md:mx-32 p-2",
        // 2. removes border from input
        "outline-none",
        // 3. font
        "text-2xl font-extralight"
      )}
      placeholder="search tables"
    />
  );
};
