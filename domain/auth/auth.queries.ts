import { useMutation, useQuery } from "@tanstack/react-query";

import { currentAuthUser } from "./auth.store";

export const currentAuthUserQueryId = "current-auth-user";

export function useCurrentAuthUser(options = {}) {
  return useQuery({
    queryKey: [currentAuthUserQueryId],
    queryFn: currentAuthUser,
    ...options,
    // retry: false,
  });
}
