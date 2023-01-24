import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "../../../icons";
import { clsx } from "clsx";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { regularFont } from "../../../fonts";

export const JoinTripButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tripId, setTripId] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (tripId.length >= 1) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [tripId]);

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
                Enter the trip ID to join a trip.
              </Dialog.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label htmlFor="tripId" className="text-lg">
                    Trip ID
                  </label>
                  <input
                    id="tripId"
                    type="text"
                    placeholder="Enter trip ID"
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
                      "text-lg text-red-600 dark:text-red-500",
                      "mt-3 leading-none",
                    )}
                  >
                    {tripId.length <= 0 && "— Trip ID cannot be empty!"}
                  </div>
                </fieldset>

                {isValidated && (
                  <div className="flex justify-end pt-1">
                    <button
                      className={clsx(
                        "inline-flex select-none justify-center rounded-md px-4 pt-2.5 pb-1 text-xl",
                        " bg-green-100 text-center text-black",
                        "border-2 border-solid border-black",
                        "focus:outline-none focus:ring-2 focus:ring-black hover:bg-green-200",
                        "dark:bg-green-700 dark:text-white dark:focus:ring-gray-500 dark:hover:bg-green-600",
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
                )}
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
