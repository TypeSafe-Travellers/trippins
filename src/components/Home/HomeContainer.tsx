import { UnauthenticatedContainer } from "./Unauthenticated/UnauthenticatedContainer";
import { AuthenticatedContainer } from "./Authenticated/AuthenticatedContainer";
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
