export const ETL = ({ setQuery }: any) => {
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
      </div>
      <h1 className="mt-8 text-4xl font-extralight">etl</h1>
    </section>
  );
};
