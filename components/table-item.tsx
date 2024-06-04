import { formatTableName } from "@/lib/utils";

export const TableItem = ({
  tableName,
  addSelectedTable,
}: {
  tableName: string;
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

      <p className="text-[10px] text-gray-400">{tableName}</p>
    </div>
  );
};
