import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { useSession } from "next-auth/react";
import { NewTripButton, JoinTripButton } from "./buttons";
import { api } from "../../../utils/api";
import { LoadingAnimation } from "../../Misc";

export const TripNav = () => {
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });

  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row lg:gap-10",
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
        {"Welcome, "}
        <span
          className={clsx(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
          )}
        >
          {user?.name ? (
            `${user.name}!`
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </span>
      </div>

      <div className={clsx("pt-5")}>
        <NewTripButton />
      </div>

      <div className={clsx("pt-5")}>
        <JoinTripButton />
      </div>
    </div>
  );
};
