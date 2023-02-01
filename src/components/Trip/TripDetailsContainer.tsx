import { motion } from "framer-motion";
import { clsx } from "clsx";
import { boldFont, semiBoldFont } from "../../fonts";
import { type FC } from "react";
import { api } from "../../utils/api";
import { DeleteTripButton } from "./DeleteTripButton";
import { EditTripButton } from "./EditTripButton";
import { CopyTripIdButton } from "../Home/Authenticated";
import { useSession } from "next-auth/react";
import { LoadingAnimation } from "../Misc";

interface Props {
  tripId: string;
}

export const TripDetailsContainer: FC<Props> = (props) => {
  const { tripId } = props;
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const { data: trip, isLoading } = api.userTrips.getSpecificTrip.useQuery({
    tripId,
  });

  return (
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
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
          "text-center text-4xl lg:text-7xl",
          "mx-auto",
          `${boldFont.className}`,
        )}
      >
        Trip Details
      </div>

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
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Name: "}
            </span>
            {isLoading === false ? (
              trip?.name
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Description: "}
            </span>
            {isLoading === false ? (
              trip?.description
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Created at: "}
            </span>
            {isLoading === false ? (
              trip?.createdAt.toLocaleString()
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Budget: "}
            </span>
            {isLoading === false ? (
              trip?.budget
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
            <span className={clsx("text-indigo-800 dark:text-indigo-100")}>
              {" INR per head"}
            </span>
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Starts at: "}
            </span>
            {isLoading === false ? (
              trip?.startDate.toLocaleString()
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Ends at: "}
            </span>
            {isLoading === false ? (
              trip?.endDate.toLocaleString()
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
          <div
            className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}
          >
            <span className={clsx("text-indigo-800 dark:text-indigo-200")}>
              {"Participants: "}
            </span>
            {isLoading === false ? (
              trip?.participants.map((p) => p.name).join(", ")
            ) : (
              <>
                loading
                <LoadingAnimation />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {trip && (
        <div
          className={clsx(
            "flex flex-row gap-5",
            "items-center justify-center",
            "py-5",
          )}
        >
          <CopyTripIdButton tripId={trip.id} tripName={trip.name} />
          {
            // if the user is the admin of the trip, show the delete button
            user?.id === trip?.adminId && (
              <>
                <EditTripButton trip={trip} />
                <DeleteTripButton tripId={trip?.id} />
              </>
            )
          }
        </div>
      )}
    </motion.div>
  );
};
