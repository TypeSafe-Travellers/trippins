import clsx from "clsx";
import { semiBoldFont } from "../../fonts";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { api } from "../../utils/api";
import { LoadingAnimation } from "../Misc";

export const ProfileDetails = () => {
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const { data: trips } = api.userTrips.getTripsByUser.useQuery({
    userId: user?.id as string,
  });

  return (
    <div
      className={clsx(
        "cursor-pointer",
        "text-2xl lg:text-3xl",
        "mx-10 break-words px-3 pt-6 pb-4 lg:mx-auto lg:px-8",
        "rounded-lg border-4 border-solid border-black dark:border-gray-200",
        "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
        "bg-gradient-to-tl from-white/70 via-white/60 to-white/50 dark:from-black/70 dark:via-black/60 dark:to-black/50",
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
          <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
            {"Username: "}
          </span>
          {user?.name ? (
            user.name
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </div>

        <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
          <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
            {"Email: "}
          </span>
          {user?.email ? (
            user.email
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </div>

        <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
          <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
            {"Trips joined: "}
          </span>
          {trips?.isParticipant ? (
            trips.isParticipant.length
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </div>

        <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
          <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
            {"Trips created: "}
          </span>
          {trips?.isCreator ? (
            trips.isCreator.length
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </div>

        <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
          <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
            {"Trips Karma: "}
          </span>
          {trips?.isBanned ? (
            `${trips.isBanned.length === 0 ? 0 : trips.isBanned.length * -1}`
          ) : (
            <>
              loading
              <LoadingAnimation />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
