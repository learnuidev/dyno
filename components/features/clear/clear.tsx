export const Clear = ({ setQuery }: any) => {
  return (
    <section className="p-8">
      <div className="flex items-center justify-between">
        <button
          className="text-2xl font-extralight uppercase"
          onClick={() => {
            setQuery("");
          }}
        >
          x
        </button>

        <h1 className="text-4xl font-extralight">clear table</h1>
      </div>

      <div>
        <h2 className="my-16 text-center text-gray-400 font-light">
          Please select a table that you would like to clear
        </h2>
      </div>
    </section>
  );
};
