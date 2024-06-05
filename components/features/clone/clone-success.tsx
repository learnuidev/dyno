import { useRouter } from "next/navigation";

export const CloneSuccess = (props: any) => {
  const { selectedStepTable } = props;

  const router = useRouter();
  return (
    <div className="my-16 flex items-center justify-center flex-col">
      <div className="mb-8">
        <p className="text-center text-3xl mb-2 text-gray-600 font-extralight border-gray-800 border-2 h-12 w-12 rounded-full pt-[3px]">
          8
        </p>
      </div>
      <h2 className="text-center text-gray-200 text-2xl font-light">Done</h2>
      <h3 className="my-12">
        You have successfully cloned: {selectedStepTable}
      </h3>

      <button
        onClick={() => {
          router.push(`/?table=${props.newTableName}`);
        }}
      >
        View
      </button>
    </div>
  );
};
