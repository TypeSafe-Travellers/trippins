import clsx from "clsx";
import { NewTripButton } from "./NewTripButton";

export const TripsContainer = () => {
  return (
    <div className={clsx("text-center")}>
      <NewTripButton />
    </div>
  );
};
