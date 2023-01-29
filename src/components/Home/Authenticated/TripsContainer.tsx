import clsx from "clsx";
import { semiBoldFont } from "../../../fonts";
import { motion } from "framer-motion";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const TripsContainer = () => {
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const { data: trips, isLoading } = api.userTrips.getAll.useQuery({
    userId: user?.id as string,
  });
  const { push } = useRouter();

  if (isLoading) {
    return (
      <div
        className={clsx(
          "flex h-full items-center justify-center",
          "text-center text-3xl",
          "mt-5 lg:mt-12",
          `${semiBoldFont.className}`,
        )}
      >
        Loading your trips...
      </div>
    );
  }

  return (
    <div className={clsx("flex flex-col gap-10", "p-10")}>
      {trips?.map((trip) => (
        <motion.div
          key={trip.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div
            onClick={() =>
              push({
                pathname: `/trips/${trip.id}`,
                query: {
                  tripId: trip.id,
                  tripName: trip.name,
                },
              })
            }
            key={trip.id}
            className={clsx(
              "text-2xl lg:text-3xl",
              "mx-0 break-words px-3 pt-6 pb-4 lg:mx-20 lg:px-8",
              "dark:bg-gradient-to-tl dark:from-black/70 dark:via-black/60 dark:to-black/50",
              "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
              "rounded-lg border-4 border-solid border-black dark:border-gray-200",
              "cursor-pointer",
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
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                Name: {trip.name}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                Description: {trip.description}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                Created At: {trip.createdAt.toLocaleString()}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
