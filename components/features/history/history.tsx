"use client";
import { DisplayIf } from "@/components/display-if";
import { useHistoryStore } from "./history-store";

export const History = () => {
  const history = useHistoryStore((state) => state.history);

  return (
    <div className="dark:text-white">
      <DisplayIf
        variant="autenticated"
        renderComponent={() => {
          return <div className="text-center"> Please Login </div>;
        }}
      >
        <code>
          <pre>{JSON.stringify(history, null, 2)}</pre>
        </code>
      </DisplayIf>
    </div>
  );
};
