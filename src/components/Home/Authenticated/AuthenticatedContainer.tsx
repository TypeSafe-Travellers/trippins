import { TripNav } from "./TripNav";
import { TripsContainer } from "./TripsContainer";
import clsx from "clsx";

export const Authenticatedcontainer = () => {
  return (
    <div className={clsx("p-5")}>
      <TripNav />
      <TripsContainer />
    </div>
  );
};
