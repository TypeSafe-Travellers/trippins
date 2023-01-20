import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { useSession } from "next-auth/react";
import { NewTripButton } from "./NewTripButton";

export const TripNav = () => {
  const { data: session } = useSession();

  return (
    <div className={clsx("flex flex-col", "pt-10")}>
      <div
        className={clsx(
          "text-4xl lg:text-7xl",
          "break-words text-center",
          `${semiBoldFont.className}`,
        )}
      >
        {`Welcome, ${session?.user?.name}!`}
      </div>

      <div className={clsx("text-center", "pt-5")}>
        <NewTripButton />
      </div>
    </div>
  );
};
