import { formatTableName } from "@/lib/utils";

export const TableItem = ({
  tableName,
  description,
  addSelectedTable,
}: {
  tableName: string;
  description?: string;
  addSelectedTable: (tableName: string) => void;
}) => {
  return (
    <div key={tableName} className="p-4 flex items-center flex-col">
      <button
        className="text-2xl hover:scale-110 transition"
        onClick={() => {
          addSelectedTable(tableName);
        }}
      >
        <span>{formatTableName(tableName)}</span>
      </button>

      <p className="text-[12px] text-gray-700">{description || tableName}</p>
    </div>
  );
};
