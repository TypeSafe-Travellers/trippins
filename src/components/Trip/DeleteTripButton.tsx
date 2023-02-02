import { Transition } from "@headlessui/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import clsx from "clsx";
import { type FC, type MouseEvent, useState, Fragment } from "react";
import { regularFont } from "../../fonts";
import { motion } from "framer-motion";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

interface Props {
  tripId: string;
}

export const DeleteTripButton: FC<Props> = (props) => {
  const { tripId } = props;
  const { push, reload } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const deleteTripMutation = api.userTrips.deleteTrip.useMutation();

  const handleDeleteTrip = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    deleteTripMutation.mutate({ tripId });
    setIsOpen(false);

    push("/");

    setTimeout(() => {
      reload();
    }, 500);
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          aria-label="Log Out"
          className={clsx(
            "inline-flex select-none items-center justify-center rounded-md",
            "px-5 pt-4 pb-2",
            "text-2xl",
            "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
            "rounded-md border-2 border-solid border-black dark:border-gray-200",
            "bg-white dark:bg-black",
            "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
            `${regularFont.className}`,
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
          >
            Delete
          </motion.div>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal forceMount>
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
            <AlertDialog.Overlay
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
            <AlertDialog.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-xl p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-gray-200 dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
              )}
            >
              <AlertDialog.Title
                className={clsx(
                  "px-2 pt-3",
                  "text-2xl text-gray-900 dark:text-gray-100",
                  `${regularFont.className}`,
                )}
              >
                Are you absolutely sure?
              </AlertDialog.Title>
              <AlertDialog.Description
                className={clsx(
                  "leading-none",
                  "mt-2 px-2 text-xl text-gray-700 dark:text-gray-400",
                  `${regularFont.className}`,
                )}
              >
                This action is irreversible. All data associated with this trip
                will be deleted.
              </AlertDialog.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <AlertDialog.Cancel
                  className={clsx(
                    "inline-flex select-none justify-center rounded-md px-4 pb-1 pt-2.5 text-lg",
                    `${regularFont.className}`,
                    "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
                    "border border-gray-300 dark:border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
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
                    Cancel
                  </motion.div>
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  type="button"
                  onClick={(e) => handleDeleteTrip(e)}
                  className={clsx(
                    `${regularFont.className}`,
                    "inline-flex select-none justify-center rounded-md px-4 pb-1 pt-2.5 text-lg",
                    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-gray-100 dark:hover:bg-red-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
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
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
