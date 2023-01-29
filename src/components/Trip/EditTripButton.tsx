import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../icons";
import { useRouter } from "next/router";
import { type FC, useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { regularFont } from "../../fonts";
import { motion } from "framer-motion";
import { api } from "../../utils/api";

interface Props {
  trip: {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    budget: number;
  };
}

export const EditTripButton: FC<Props> = (props) => {
  const { reload, push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { trip } = props;
  const [tripName, setTripName] = useState(trip.name);
  const [tripDescription, setTripDescription] = useState(trip.description);
  const [tripBudget, setTripBudget] = useState(trip.budget);
  const [startDate, setStartDate] = useState(
    trip.startDate.toISOString().slice(0, 16),
  );
  const [endDate, setEndDate] = useState(
    trip.endDate.toISOString().slice(0, 16),
  );
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (
      tripName.length >= 3 &&
      tripName.length <= 50 &&
      tripDescription.length >= 3 &&
      tripDescription.length <= 1000 &&
      tripBudget >= 0 &&
      startDate !== "" &&
      endDate !== "" &&
      startDate !== endDate &&
      startDate < endDate &&
      (tripName !== trip.name ||
        tripDescription !== trip.description ||
        tripBudget !== trip.budget ||
        startDate !== trip.startDate.toISOString().slice(0, 16) ||
        endDate !== trip.endDate.toISOString().slice(0, 16))
    ) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [
    tripName,
    tripDescription,
    startDate,
    endDate,
    trip.name,
    trip.description,
    trip.startDate,
    trip.endDate,
    trip.budget,
    tripBudget,
  ]);

  const editTripDetailsMutation = api.userTrips.editTrip.useMutation();

  const handleSubmit = (): void => {
    /**
     * If the user has not changed the name or email, we don't want to send
     * an update request to the server. So, we only send the update request
     * if the user has changed the name or email (or both).
     *
     * If the user has not changed the name or email, we send undefined to
     * the server. The server will then not update the name or email.
     *
     * Note: Prisma treats undefined as a no-operation.
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
     */
    editTripDetailsMutation.mutate({
      tripId: trip.id,
      name: tripName === trip.name ? undefined : tripName,
      description:
        tripDescription === trip.description ? undefined : tripDescription,
      budget: tripBudget === trip.budget ? undefined : tripBudget,
      startDate:
        new Date(startDate) === trip.startDate
          ? undefined
          : new Date(startDate),
      endDate:
        new Date(endDate) === trip.endDate ? undefined : new Date(endDate),
    });

    setIsOpen(false);
    push("/");
    setTimeout(() => {
      reload();
    }, 500);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
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
            Edit Trip
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
              <Dialog.Title className="text-2xl">
                Edit Trip Details
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-xl">
                Edit your trip details below.
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
                    value={tripBudget}
                    onChange={(e) => {
                      setTripBudget(parseInt(e.target.value));
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
                        tripBudget < 0
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
