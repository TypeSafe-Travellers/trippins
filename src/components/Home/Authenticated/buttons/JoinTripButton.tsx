import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../../../icons";
import { clsx } from "clsx";
import { type MouseEvent, Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { regularFont } from "../../../../fonts";
import { api } from "../../../../utils/api";
import { useSession } from "next-auth/react";

export const JoinTripButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tripId, setTripId] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isParticipant, setIsParticipant] = useState(true);
  const [isBanned, setIsBanned] = useState(true);
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const { data: allTripIds } = api.userTrips.getAllTripIds.useQuery();
  const { data: participants } = api.userTrips.getTripParticipants.useQuery({
    tripId,
  });
  const { data: bannedParticipants } =
    api.userTrips.getBannedParticipants.useQuery({ tripId });
  const addTripParticipantMutation = api.userTrips.addParticipant.useMutation({
    onSuccess: () => {
      utils.userTrips.getAll.refetch({ userId: user?.id as string });
    },
  });
  const utils = api.useContext();

  const handleAddParticipant = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    addTripParticipantMutation.mutate({
      tripId,
      userId: user?.id as string,
    });

    setIsOpen(false);
  };

  useEffect(() => {
    // check if tripId is valid
    const tripExists = allTripIds?.find((t) => t.id === tripId);

    // check if user is already a participant
    setIsParticipant(
      participants?.find((p) => p.participants.find((pp) => pp.id === user?.id))
        ? true
        : false,
    );

    // check if user is banned
    setIsBanned(
      bannedParticipants?.find((p) =>
        p.bannedUsers.find((bu) => bu.id === user?.id),
      )
        ? true
        : false,
    );

    if (tripId.length === 25 && tripExists && !isParticipant && !isBanned) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }

    if (tripId) {
      utils.userTrips.getTripParticipants.refetch({ tripId });
      utils.userTrips.getBannedParticipants.refetch({ tripId });
    }

    return () => {
      utils.userTrips.getTripParticipants.invalidate();
      utils.userTrips.getBannedParticipants.invalidate();
    };
  }, [
    tripId,
    isBanned,
    user?.id,
    allTripIds,
    participants,
    isParticipant,
    bannedParticipants,
    utils.userTrips.getTripParticipants,
    utils.userTrips.getBannedParticipants,
  ]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.div
          initial={{ y: 100, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
          }}
        >
          <button
            className={clsx(
              `${regularFont.className}`,
              "inline-flex select-none items-center justify-center rounded-md",
              "mx-auto px-5 pt-4 pb-2",
              "text-2xl",
              "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
              "rounded-md border-2 border-solid border-black dark:border-gray-200",
              "bg-white dark:bg-black",
              "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
              // Register all radix states
              "group",
              "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
              "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
              "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50",
            )}
          >
            Join Trip
          </button>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Content
              forceMount
              className={clsx(
                `${regularFont.className}`,
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-6 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-gray-100 dark:bg-gray-800",
              )}
            >
              <Dialog.Title className="text-2xl">Join Trip</Dialog.Title>
              <Dialog.Description className="mt-2 text-xl">
                Enter the trip code to join a trip.
              </Dialog.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label htmlFor="tripId" className="text-lg">
                    Trip Code
                  </label>
                  <input
                    id="tripId"
                    type="text"
                    placeholder="Enter trip code"
                    onChange={(e) => setTripId(e.target.value)}
                    autoComplete="trip-id"
                    className={clsx(
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "text-xl",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  />

                  <div
                    className={clsx(
                      `${
                        tripId.length !== 0 && !isValidated
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    {isParticipant
                      ? "You're already a participant!"
                      : isBanned
                      ? "You're banned from this trip!"
                      : "Trip code is invalid!"}
                  </div>
                </fieldset>

                <div className="flex justify-end">
                  <button
                    disabled={!isValidated}
                    onClick={(e) => handleAddParticipant(e)}
                    className={clsx(
                      `${
                        isValidated
                          ? "cursor-pointer bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600"
                          : "cursor-not-allowed border-transparent bg-gray-300 dark:bg-gray-700"
                      }`,
                      "inline-flex select-none justify-center rounded-md px-4 pt-2.5 pb-1 text-xl",
                      "text-center text-black",
                      "border-2 border-solid border-black",
                      "focus:outline-none focus:ring-2 focus:ring-black",
                      "dark:text-white dark:focus:ring-gray-500",
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
                      Confirm
                    </motion.div>
                  </button>
                </div>
              </form>

              <Dialog.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                )}
              >
                <CrossIcon />
              </Dialog.Close>
            </Dialog.Content>
          </Transition.Child>
        </Transition.Root>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Dialog };
