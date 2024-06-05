import { useSearchParams } from "next/navigation";

export const useGetTableId = () => {
  const searchParams = useSearchParams();
  const tableParams = searchParams.get("table");
  return tableParams || "";
};
