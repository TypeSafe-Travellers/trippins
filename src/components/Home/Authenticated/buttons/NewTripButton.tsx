import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../../../icons";
import clsx from "clsx";
import { type MouseEvent, Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { api } from "../../../../utils/api";
import { regularFont } from "../../../../fonts";

export const NewTripButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [perHeadBudget, setPerHeadBudget] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const createTripMutation = api.userTrips.createTrip.useMutation({
    onSuccess: () => {
      utils.userTrips.getAll.refetch({ userId: user?.id as string });
    },
  });
  const utils = api.useContext();

  useEffect(() => {
    if (
      tripName.length >= 3 &&
      tripName.length <= 50 &&
      tripDescription.length >= 3 &&
      tripDescription.length <= 1000 &&
      startDate !== "" &&
      endDate !== "" &&
      startDate < endDate &&
      startDate !== endDate &&
      perHeadBudget >= 0
    ) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }

    if (session?.user?.email) {
      utils.userProfile.getProfileDetails.refetch({
        email: session?.user?.email,
      });
    }

    return () => {
      utils.userProfile.getProfileDetails.invalidate();
    };
  }, [
    endDate,
    tripName,
    startDate,
    perHeadBudget,
    tripDescription,
    session?.user?.email,
    utils.userProfile.getProfileDetails,
  ]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (
      tripName &&
      tripDescription &&
      startDate &&
      endDate &&
      perHeadBudget &&
      user?.id
    ) {
      createTripMutation.mutate({
        userId: user.id,
        name: tripName,
        description: tripDescription,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: perHeadBudget,
      });

      setIsOpen(false);
    }
  };

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
            type="button"
            className={clsx(
              `${regularFont.className}`,
              "text-2xl",
              "inline-flex select-none items-center justify-center rounded-md",
              "mx-auto px-5 pt-4 pb-2",
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
            New Trip
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
              <Dialog.Title className="text-2xl">Create New Trip</Dialog.Title>
              <Dialog.Description className="mt-2 text-xl">
                Fill this form to set up a new trip
              </Dialog.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label htmlFor="tripName" className="text-lg">
                    Trip Name
                  </label>
                  <input
                    id="tripName"
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    autoComplete="trip-name"
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
                        tripName.length !== 0 &&
                        (tripName.length < 3 || tripName.length > 50)
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    {tripName.length < 3 &&
                      "Trip name must be at least 3 characters long!"}
                    {tripName.length > 50 &&
                      "Trip name must be at most 50 characters long!"}
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="email" className="text-lg">
                    Trip Description
                  </label>
                  <textarea
                    id="tripDescription"
                    value={tripDescription}
                    onChange={(e) => setTripDescription(e.target.value)}
                    autoComplete="tripDescription"
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
                        tripDescription.length !== 0 &&
                        (tripDescription.length < 3 ||
                          tripDescription.length > 1000)
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    {tripDescription.length < 3 &&
                      "Trip description must be at least 3 characters long!"}
                    {tripDescription.length > 1000 &&
                      "Trip description must be at most 1000 characters long!"}
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="startDate" className="text-lg">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    autoComplete="tripDescription"
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
                        startDate.length !== 0 &&
                        (startDate > endDate || startDate === endDate)
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    Start date must be before end date!
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="endDate" className="text-lg">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    autoComplete="endDate"
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
                        endDate.length !== 0 &&
                        (startDate > endDate || startDate === endDate)
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    End date must be after start date!
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="perHeadBudget" className="text-lg">
                    Per Head Budget (in INR)
                  </label>
                  <input
                    id="perHeadBudget"
                    type="number"
                    value={perHeadBudget}
                    onChange={(e) => {
                      setPerHeadBudget(parseInt(e.target.value));
                    }}
                    autoComplete="Per Head Budget"
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
                        perHeadBudget < 0
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    Budget cannot be negative!
                  </div>
                </fieldset>

                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!isValidated}
                    onClick={(e) => handleSubmit(e)}
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
