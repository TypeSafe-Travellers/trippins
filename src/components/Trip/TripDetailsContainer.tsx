import { motion } from "framer-motion";
import { clsx } from "clsx";
import { boldFont, semiBoldFont } from "../../fonts";
import { type FC } from "react";
import { api } from "../../utils/api";

interface Props {
  tripId: string;
}

export const TripDetailsContainer: FC<Props> = (props) => {
  const { tripId } = props;
  const { data: trip, isLoading } = api.userTrips.getSpecificTrip.useQuery({
    tripId,
  });

  return (
    <>
      <>
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
              "text-center text-4xl lg:text-7xl",
              "mx-auto",
              `${boldFont.className}`,
            )}
          >
            Trip Details
          </div>

          <div
            className={clsx(
              "text-2xl lg:text-3xl",
              "mx-10 break-words px-3 pt-6 pb-4 lg:mx-auto lg:px-8",
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
                {`Name: ${isLoading === false ? trip?.name : "loading..."}`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Description: ${
                  isLoading === false ? trip?.description : "loading..."
                }`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Created at: ${
                  isLoading === false
                    ? trip?.createdAt.toLocaleString()
                    : "loading..."
                }`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Budget: ${isLoading === false ? trip?.budget : "loading..."}`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Starts at: ${
                  isLoading === false
                    ? trip?.startDate.toLocaleString()
                    : "loading..."
                }`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Ends at: ${
                  isLoading === false
                    ? trip?.endDate.toLocaleString()
                    : "loading..."
                }`}
              </div>
              <div
                className={clsx(
                  "my-2 leading-none",
                  `${semiBoldFont.className}`,
                )}
              >
                {`Participants: ${
                  isLoading === false
                    ? trip?.participants.map((p) => p.name).join(", ")
                    : "loading..."
                }`}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </>
    </>
  );
};
