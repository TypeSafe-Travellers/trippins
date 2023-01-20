import { useSession } from "next-auth/react";
import { GetStartedButton } from "./GetStartedButton";
import { HeroBanner } from "./HeroBanner";
import clsx from "clsx";
import { TripsContainer } from "./TripsContainer";
import { Footer } from "../Footer";

export const HomeContainer = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <TripsContainer />
      ) : (
        <div
          className={clsx(
            "flex flex-col items-center",
            "items-center justify-center",
          )}
        >
          <div className={clsx("p-5")}>
            <HeroBanner />
          </div>

          <div className={clsx("p-5")}>
            <GetStartedButton />
          </div>

          <div className={clsx("absolute bottom-0 lg:bottom-3")}>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};
