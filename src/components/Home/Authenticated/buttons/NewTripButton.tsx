import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../../../icons";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
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
  const { reload } = useRouter();

  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });

  useEffect(() => {
    if (
      tripName.length >= 3 &&
      tripName.length <= 50 &&
      tripDescription.length >= 3 &&
      tripDescription.length <= 1000 &&
      startDate !== "" &&
      endDate !== "" &&
      startDate < endDate &&
      perHeadBudget >= 0
    ) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [tripName, tripDescription, startDate, endDate, perHeadBudget]);

  const createTripMutation = api.userTrips.createTrip.useMutation();

  const handleSubmit = (): void => {
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

      setTimeout(() => {
        reload();
      }, 1000);
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
              "inline-flex select-none items-center justify-center rounded-md",
              "px-3 pt-2 pb-0.5 lg:px-5 lg:pt-4 lg:pb-2",
              "mx-auto",
              "text-xl lg:text-2xl",
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
                        tripName.length < 3 || tripName.length > 50
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    Trip name must be between 3 and 50 characters!
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
                        tripDescription.length < 3 ||
                        tripDescription.length > 1000
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    Trip description must be between 3 and 1000 characters!
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
                        startDate === "" || startDate > endDate
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    {`${
                      startDate === ""
                        ? "Start date cannot be empty!"
                        : "Start date must be before end date!"
                    }`}
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
                        endDate === "" || startDate > endDate
                          ? "text-red-600 dark:text-red-500"
                          : "text-transparent dark:text-transparent"
                      }`,
                      "text-lg",
                      "mt-2 mb-1 leading-none",
                    )}
                  >
                    {`${
                      endDate === ""
                        ? "End date cannot be empty!"
                        : "End date must be after start date!"
                    }`}
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
                      "text-lg text-red-600 dark:text-red-500",
                      "mt-3 leading-none",
                    )}
                  >
                    {perHeadBudget < 0 && "Budget cannot be negative!"}
                  </div>
                </fieldset>

                <div className="flex justify-end">
                  <button
                    disabled={!isValidated}
                    onClick={handleSubmit}
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
