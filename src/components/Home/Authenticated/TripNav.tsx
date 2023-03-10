import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { useSession } from "next-auth/react";
import { NewTripButton, JoinTripButton } from "./buttons";
import { api } from "../../../utils/api";
import { LoadingAnimation } from "../../Misc";
import { useEffect } from "react";

export const TripNav = () => {
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const utils = api.useContext();

  useEffect(() => {
    if (session?.user?.email) {
      utils.userProfile.getProfileDetails.refetch({
        email: session?.user?.email,
      });
    }

    return () => {
      utils.userProfile.getProfileDetails.invalidate();
    };
  }, [session?.user?.email, utils.userProfile.getProfileDetails]);

  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row lg:gap-10",
        "items-center justify-center text-center",
      )}
    >
      <div
        className={clsx(
          "px-2 pt-10 lg:px-0",
          "text-4xl lg:text-7xl",
          "break-words leading-none",
          `${semiBoldFont.className}`,
        )}
      >
        {"Welcome, "}
        <div
          className={clsx(
            "hidden lg:inline-block",
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
        </div>

        <div
          className={clsx(
            "block sm:hidden md:hidden",
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
        </div>
      </div>

      <div className="flex gap-x-16 lg:gap-10">
        <div className={clsx("pt-5")}>
          <NewTripButton />
        </div>

        <div className={clsx("pt-5")}>
          <JoinTripButton />
        </div>
      </div>
    </div>
  );
};
