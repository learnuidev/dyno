import { cn } from "@/lib/utils";

export const FilterTablesInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center w-full justify-center">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        className={cn(
          // 1. layout
          "w-full h-12 lg:h-[54px] sm:w-[640px] p-2 px-6 rounded-full",
          // 2. removes border from input
          "outline-none",
          // 3. font
          "text-2xl font-extralight",
          // 4. Shadow
          "focus:shadow-sm focus:shadow-rose-400 transition"
        )}
        placeholder="ask anything..."
      />
    </div>
  );
};
