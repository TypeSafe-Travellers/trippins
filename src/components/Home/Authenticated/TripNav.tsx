import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { useSession } from "next-auth/react";
import { NewTripButton } from "./NewTripButton";

export const TripNav = () => {
  const { data: session } = useSession();

  return (
    <div
      className={clsx(
        "flex flex-row gap-16",
        "items-center justify-center text-center",
      )}
    >
      <div
        className={clsx(
          "pt-10",
          "text-4xl lg:text-7xl",
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
