"use client";
import { useHistoryStore } from "./history-store";

export const History = () => {
  const history = useHistoryStore((state) => state.history);

  return (
    <div className="dark:text-white">
      <code>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </code>
    </div>
  );
};
