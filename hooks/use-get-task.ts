import { useSearchParams } from "next/navigation";

export const useGetTask = () => {
  const searchParams = useSearchParams();
  const tableParams = searchParams.get("task");
  return tableParams || "";
};
