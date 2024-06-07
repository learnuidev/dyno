import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

export const DisplayIf = ({
  variant,
  children,
}: {
  variant: "autenticated" | "public";
  children: React.ReactNode;
}) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});

  console.log("AUTH USER", authUser);

  switch (variant) {
    case "autenticated":
      return authUser?.jwt ? children : null;
    default:
      return children;
  }
};
