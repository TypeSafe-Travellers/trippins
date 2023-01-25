import { useState, type FC } from "react";
import clsx from "clsx";
import { regularFont } from "../../../fonts";
import { motion } from "framer-motion";
import * as Toast from "@radix-ui/react-toast";
import { useMediaQuery } from "../../../hooks";

interface Props {
  tripId: string;
}

export const CopyTripIdButton: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");

  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(props.tripId);

      if (open) {
        setOpen(false);
        setTimeout(() => {
          setOpen(true);
        }, 400);
      } else {
        setOpen(true);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
    >
      <Toast.Provider swipeDirection={isMd ? "right" : "down"}>
        <button
          className={clsx(
            `${regularFont.className}`,
            "inline-flex select-none items-center justify-center rounded-md",
            "lg:px-3 lg:pt-2.5 lg:pb-1",
            "px-2 pt-2 pb-0.5",
            "mx-auto",
            "text-lg lg:text-xl",
            "shadow-md shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 hover:dark:shadow-indigo-700",
            "rounded-md border-2 border-solid border-black dark:border-gray-200",
            "bg-white dark:bg-black",
            "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
          )}
          onClick={handleCopyToClipboard}
        >
          Share Trip
        </button>

        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={clsx(
            "fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm",
            "bg-white dark:bg-gray-800",
            "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
            "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
            "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
            "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
            "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          )}
        >
          <div className="flex">
            <div className="flex w-0 flex-1 items-center py-4 pl-5">
              <div className="radix w-full">
                <Toast.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Pull Request Review
                </Toast.Title>
                <Toast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  Someone requested your review on{" "}
                  <span className="font-medium">repository/branch</span>
                </Toast.Description>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col space-y-1 px-3 py-2">
                <div className="flex h-0 flex-1">
                  <Toast.Action
                    altText="view now"
                    className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-purple-600 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 hover:bg-gray-50 dark:text-purple-500 dark:hover:bg-gray-900"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("https://github.com");
                    }}
                  >
                    Review
                  </Toast.Action>
                </div>
                <div className="flex h-0 flex-1">
                  <Toast.Close className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-900">
                    Dismiss
                  </Toast.Close>
                </div>
              </div>
            </div>
          </div>
        </Toast.Root>

        <Toast.Viewport />
      </Toast.Provider>
    </motion.div>
  );
};
