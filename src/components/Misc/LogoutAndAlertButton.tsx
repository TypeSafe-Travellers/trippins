import { Transition } from "@headlessui/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import clsx from "clsx";
import { useState, Fragment } from "react";
import { regularFont } from "../../fonts";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

export const LogoutAndAlertButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          aria-label="Log Out"
          className={clsx(
            "mr-2 mb-2 px-5 pt-2.5 pb-1",
            "inline-flex items-center rounded-md text-xl",
            "bg-red-100 text-center text-black",
            "border-2 border-solid border-black",
            "focus:outline-none focus:ring-2 focus:ring-black hover:bg-red-100/75",
            "dark:bg-red-600/90 dark:text-white dark:focus:ring-gray-500 dark:hover:bg-red-600",
            `${regularFont.className}`,
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
          >
            Log Out
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
                You will have to log in again if you want to access your
                account.
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
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setIsOpen(false);
                  }}
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
