import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../icons";
import { clsx } from "clsx";
import { type FC, Fragment, useState } from "react";
import { motion } from "framer-motion";
import { regularFont } from "../../fonts";
import { api } from "../../utils/api";

interface Props {
  tripId: string;
}

export const RemoveParticipants: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tripId } = props;
  const { data: trip } = api.userTrips.getSpecificTrip.useQuery({
    tripId,
  });

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
            Remove Participants
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
              <Dialog.Title className="text-2xl leading-none">
                Remove Participant
              </Dialog.Title>
              <Dialog.Description className="my-3 text-xl leading-none">
                This action cannot be undone. However, you can always add them
                back!
              </Dialog.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label
                    htmlFor="participants"
                    className={clsx(
                      `${regularFont.className}`,
                      "my-2",
                      "block text-lg lg:text-xl",
                      "text-gray-900 dark:text-white",
                    )}
                  >
                    Select a participant to remove
                  </label>
                  <select
                    id="participants"
                    className={clsx(
                      "text-xl",
                      "mt-1 block w-full rounded-md px-1 pt-2 pb-1",
                      "bg-white dark:bg-gray-900",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                    )}
                  >
                    <option selected>Choose a participant</option>
                    {trip?.participants.map((participant) => (
                      <option
                        key={participant.id}
                        value={participant.id}
                        disabled={participant.id === trip.adminId}
                      >
                        {`${participant.name} ${
                          participant.id === trip.adminId ? " (Admin)" : ""
                        }`}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <div className="flex justify-end pt-3">
                  <button
                    // disabled={!isValidated}
                    // onClick={handleAddParticipant}
                    /**
                     `${
                       isValidated
                         ? "cursor-pointer bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600"
                         : "cursor-not-allowed border-transparent bg-gray-300 dark:bg-gray-700"
                     }`,
                     */
                    className={clsx(
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
