import { motion } from "framer-motion";
import { clsx } from "clsx";
import { boldFont, regularFont, semiBoldFont } from "../../fonts";
import { type FC } from "react";
import { api } from "../../utils/api";
import { ReloadIcon } from "../../icons";
import { useSession } from "next-auth/react";
import { Footer, LoadingAnimation } from "../Misc";
import {
  DeleteTripButton,
  EditTripButton,
  CopyTripIdButton,
  ManageParticipants,
  RemoveTripButton,
} from "./buttons";
import { TripChat } from "./TripChat";
import { useRouter } from "next/router";

interface Props {
  tripId: string;
}

export const TripDetailsContainer: FC<Props> = (props) => {
  const { tripId } = props;
  const { reload } = useRouter();
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
          "flex items-center justify-between",
          "text-center text-5xl lg:text-left lg:text-7xl",
          "mx-5 mt-10",
          `${boldFont.className}`,
        )}
      >
        <div
          className={clsx(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
            "mr-4",
          )}
        >
          Trip Details
        </div>
        <span>
          <button onClick={() => reload()}>
            <ReloadIcon />
          </button>
        </span>
      </div>

      <div className="flex flex-col gap-y-5 gap-x-0 lg:flex-row lg:gap-y-0 lg:gap-x-5">
        <div
          className={clsx(
            "cursor-pointer",
            "text-2xl lg:text-3xl",
            "mx-5 my-5 break-words px-3 pt-6 pb-4 lg:mx-auto lg:px-8",
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

          {trip && (
            <>
              <div
                className={clsx(
                  "flex gap-x-3",
                  "items-center justify-center py-3",
                )}
              >
                <CopyTripIdButton tripId={trip.id} tripName={trip.name} />

                {user?.id && user?.id !== trip?.adminId && (
                  <RemoveTripButton tripId={trip?.id} userId={user.id} />
                )}

                {user?.id === trip?.adminId && (
                  <div className="flex gap-x-3">
                    <ManageParticipants tripId={trip?.id} />
                    <EditTripButton trip={trip} />
                    <DeleteTripButton tripId={trip?.id} userId={user.id} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div>
          <div
            className={clsx(
              `${regularFont.className}`,
              "text-center text-2xl lg:text-3xl",
              "font-semibold tracking-wide",
              "m-auto break-words p-2",
            )}
          >
            <span className={clsx("text-indigo-700 dark:text-indigo-200")}>
              Chat with your fellow travellers
            </span>
          </div>

          {trip && user && <TripChat tripId={trip.id} userId={user.id} />}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
