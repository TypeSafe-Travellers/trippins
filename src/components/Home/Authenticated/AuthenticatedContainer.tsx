import { Footer } from "../../Misc/Footer";
import { TripNav } from "./TripNav";
import { TripsContainer } from "./TripsContainer";
import clsx from "clsx";

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
