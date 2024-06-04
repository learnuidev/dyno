export const TableFilters = ({
  attribute,
  setAttribute,
  setPredicate,
  predicate,
  runSearch,
  clearSearch,
  value,
  setValue,
  //   TODO: refator to use zustand
}: any) => {
  return (
    <div className="mb-4 space-x-4">
      <input
        value={attribute}
        onChange={(e) => {
          setAttribute(e.target.value);
        }}
        placeholder="attribute"
        className="h-10 px-2"
      />
      <input
        placeholder="predicate"
        value={predicate}
        onChange={(e) => {
          setPredicate(e.target.value);
        }}
        className="h-10 px-2"
      />
      <input
        placeholder="value"
        className="h-10 px-2"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <button onClick={runSearch}>Run ⌘</button>
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
};
