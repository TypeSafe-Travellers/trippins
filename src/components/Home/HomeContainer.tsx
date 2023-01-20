import { useSession } from "next-auth/react";
import { GetStartedButton } from "./GetStartedButton";
import { HeroBanner } from "./HeroBanner";
import clsx from "clsx";
import { TripsContainer } from "./TripsContainer";

export const HomeContainer = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <TripsContainer />
      ) : (
        <>
          <div className={clsx("p-5")}>
            <HeroBanner />
          </div>

          <div className={clsx("p-5")}>
            <GetStartedButton />
          </div>
        </>
      )}
    </>
  );
};
