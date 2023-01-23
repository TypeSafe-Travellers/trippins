import { TripNav, TripsContainer } from ".";
import clsx from "clsx";
import { Footer } from "../../Misc";

export const AuthenticatedContainer = () => {
  return (
    <>
      <div className={clsx("p-5")}>
        <TripNav />
        <TripsContainer />
      </div>

      <div className={clsx("relative bottom-0 text-center lg:bottom-3")}>
        <Footer />
      </div>
    </>
  );
};
