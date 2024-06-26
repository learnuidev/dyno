import { useListTables } from "@/components/tables-list";
import { useState } from "react";
import { CloneSteps } from "./clone-steps";
import { Icons } from "@/components/icons";
import { useGetTableId } from "@/hooks/use-get-table-id";

export const Clone = ({ setQuery }: any) => {
  const { data: tables } = useListTables();

  const tableId = useGetTableId();
  const [targetTableName, setSelectedTable] = useState(tableId || "");
  const [newTableNameSync, setNewTableNameSync] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [attributesSync, setAttributesSync] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributesV2, setAttributesV2] = useState([]);
  const [preview, setPreview] = useState("review");

  const [query, setQuery2] = useState("");

  const addSelectedTable = (table: string) => {
    setSelectedTable(table);
  };

  const filteredTableNames = tables?.TableNames?.filter((name) => {
    if (!query) {
      return false;
    }
    return name?.toLowerCase()?.includes(query?.toLowerCase());
  });

  // const { tables } = useListTab

  return (
    <section className="p-8">
      {!tableId && (
        <div className="flex items-center justify-between text-gray-600">
          <button
            className="text-2xl font-extralight uppercase hover:text-white transition"
            onClick={() => {
              setQuery("");
            }}
          >
            <Icons.x />
          </button>

          <h1 className="text-2xl font-extralight">clone</h1>
        </div>
      )}

      <CloneSteps
        newTableName={newTableName}
        attributesV2={attributesV2}
        setAttributesV2={setAttributesV2}
        query={query}
        setQuery2={setQuery2}
        filteredTableNames={filteredTableNames}
        addSelectedTable={addSelectedTable}
        selectedStepTable={targetTableName}
        setNewTableName={setNewTableName}
        setNewTableNameSync={setNewTableNameSync}
        newTableNameSync={newTableNameSync}
        preview={preview}
        setPreview={setPreview}
        attributes={attributes}
        setAttributes={setAttributes}
        attributesSync={attributesSync}
        setAttributesSync={setAttributesSync}
      />
    </section>
  );
};
