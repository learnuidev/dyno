import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useMutation } from "@tanstack/react-query";

export const useDeleteItemMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  return useMutation({
    mutationFn: async (params: any) => {
      const updatedItem = await fetch("/api/delete-item", {
        method: "POST",
        headers: {
          authorization: authUser?.jwt,
        },
        body: JSON.stringify({
          id: params?.id,
          TableName: params.TableName,
        }),
      });

      if (!updatedItem.ok) {
        throw new Error("Error");
      }

      return updatedItem.json();
    },
  });
};
