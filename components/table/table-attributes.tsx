import { cn } from "@/lib/utils";
import { useState } from "react";

export const TableAttributes = ({ table }: any) => {
  const [showFilters, setShowFilters] = useState(false);

  if (!showFilters) {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowFilters(true);
          }}
          className="text-gray-400"
        >
          filter attributes
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-6 grid-cols-3 gap-4 m-4">
        {table.getAllLeafColumns().map((column: any) => {
          return (
            <div key={column.id} className="flex space-x-2 items-center">
              <input
                className={cn(
                  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  ""
                )}
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />
              <label className="">{column.id}</label>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowFilters(false);
          }}
          className="text-gray-400"
        >
          {" "}
          close
        </button>
      </div>
    </div>
  );
};
