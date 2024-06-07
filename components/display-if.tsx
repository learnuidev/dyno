import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

export const DisplayIf = ({
  variant,
  renderComponent: RenderComponent,
  children,
}: {
  variant: "autenticated" | "public";
  renderComponent?: any;
  children: React.ReactNode;
}) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});

  console.log("AUTH USER", authUser);

  switch (variant) {
    case "autenticated":
      return authUser?.jwt ? (
        children
      ) : RenderComponent ? (
        <RenderComponent />
      ) : null;
    default:
      return children;
  }
};
