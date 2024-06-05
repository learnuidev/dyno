import { StepItem } from "@/components/step-item";
import { useRouter } from "next/navigation";

export const CloneSuccess = (props: any) => {
  const { selectedStepTable } = props;

  const router = useRouter();

  return (
    <StepItem
      stepNumber={8}
      title="Done"
      description={`You have successfully cloned: ${selectedStepTable}`}
    >
      <button
        onClick={() => {
          router.push(`/?table=${props.newTableName}`);
        }}
      >
        View
      </button>
    </StepItem>
  );
};
