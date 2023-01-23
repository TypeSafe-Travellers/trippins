import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { useSession } from "next-auth/react";
import { NewTripButton } from ".";

export const TripNav = () => {
  const { data: session } = useSession();

  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row lg:gap-16",
        "items-center justify-center text-center",
      )}
    >
      <div
        className={clsx(
          "px-10 pt-10 lg:px-0",
          "text-3xl lg:text-7xl",
          "break-words",
          `${semiBoldFont.className}`,
        )}
      >
        {`Welcome, ${session?.user?.name}!`}
      </div>

      <div className={clsx("pt-5")}>
        <NewTripButton />
      </div>
    </div>
  );
};
