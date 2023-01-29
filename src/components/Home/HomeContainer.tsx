import { UnauthenticatedContainer } from "./Unauthenticated";
import { AuthenticatedContainer } from "./Authenticated";
import { useSession } from "next-auth/react";

export const HomeContainer = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <AuthenticatedContainer />
      ) : (
        <UnauthenticatedContainer />
      )}
    </>
  );
};
