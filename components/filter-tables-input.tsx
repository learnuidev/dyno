import {
  currentAuthUserQueryId,
  useCurrentAuthUser,
} from "@/domain/auth/auth.queries";
import { signOut } from "@/domain/auth/auth.store";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { listTablesQueryId } from "./tables-list";

export const FilterTablesInput = ({
  autoFocus = true,
  query,
  setQuery,
  placeholder,
}: {
  autoFocus?: boolean;
  query: string;
  placeholder?: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  const { data: authUser, isLoading } = useCurrentAuthUser({});

  const queryClient = useQueryClient();
  return (
    <div className="flex items-center w-full justify-center">
      <input
        autoFocus
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setQuery("");
          }
          if (event.key === "Enter") {
            if (
              ["logout", "log", "so", "signout"]?.includes(
                query.toLowerCase()
              ) &&
              authUser?.jwt
            ) {
              return signOut().then(() => {
                // setQuery("");
                // alert("yo");
                window.location.reload();
                //   @ts-ignore
                queryClient?.invalidateQueries([currentAuthUserQueryId]);
                //   @ts-ignore
                queryClient?.refetchQueries([listTablesQueryId]);
                router.refresh();
              });
            }
            if (["login"]?.includes(query.toLowerCase()) && !authUser?.jwt) {
              setQuery("");
              router.push("/login");
            } else {
              setQuery("");
            }

            console.log(event.key);
          }
        }}
        className={cn(
          // 1. layout
          "w-full h-12 lg:h-[54px] sm:w-[640px] p-2 px-6 rounded-full",
          // 2. removes border from input
          "outline-none",
          // 3. font
          "text-2xl font-extralight",
          // 4. Shadow
          "focus:shadow-sm focus:shadow-rose-400 transition"
        )}
        placeholder={placeholder || "how can i help"}
      />
    </div>
  );
};
