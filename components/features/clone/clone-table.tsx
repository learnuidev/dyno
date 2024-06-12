import { StepItem } from "@/components/step-item";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

import { useEffect, useState } from "react";

export const CloneTable = (props: any) => {
  const {
    newTableName,
    setPreview,

    selectedStepTable,
  } = props;

  const [isCreating, setIsCreating] = useState(false);
  const { data: authUser } = useCurrentAuthUser({});

  useEffect(() => {
    const cloneTable = async () => {
      const cloned = await fetch("/api/clone-table", {
        method: "POST",
        headers: {
          authorization: authUser?.jwt,
        },
        body: JSON.stringify({
          TargetTableName: selectedStepTable,
          NewTableName: newTableName,
        }),
      });

      if (!cloned.ok) {
        setPreview("check-table");
      } else {
        setPreview("check-table");
      }
    };
    cloneTable().then(() => {
      setPreview("check-table");
    });
  }, []);

  return (
    <StepItem stepNumber={5} title="Creating table">
      <section className="dark:text-white">
        <h1 className="my-32 text-5xl bont-bold">...</h1>
      </section>

      <div className="mt-32">
        <button
          onClick={() => {
            setPreview("clone");
          }}
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </div>
    </StepItem>
  );
};
