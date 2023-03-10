import { useState, type FC, useEffect } from "react";
import clsx from "clsx";
import { regularFont } from "../../../fonts";
import { motion } from "framer-motion";
import * as Toast from "@radix-ui/react-toast";
import { useMediaQuery } from "../../../hooks";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";

interface Props {
  tripId: string;
  tripName: string;
}

export const CopyTripIdButton: FC<Props> = (props) => {
  const { tripId, tripName } = props;
  const [open, setOpen] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");
  const { data: session } = useSession();
  const { data: user } = api.userProfile.getProfileDetails.useQuery({
    email: session?.user?.email as string,
  });
  const utils = api.useContext();
  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(
        `${user?.name} has invited you to join their trip: ${tripName}! The trip code is ${tripId}. Signup / Login @ Trippins https://trippins.netlify.app to join.`,
      );

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

  useEffect(() => {
    if (session?.user?.email) {
      utils.userProfile.getProfileDetails.refetch({
        email: session.user.email,
      });
    }
  }, [session?.user?.email, utils.userProfile.getProfileDetails]);

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
            "mx-auto px-3 pt-2.5 pb-1.5 lg:px-5 lg:pt-4 lg:pb-2",
            "text-xl lg:text-2xl",
            "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
            "rounded-md border-2 border-solid border-black dark:border-gray-200",
            "bg-white dark:bg-black",
            "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
          )}
          onClick={handleCopyToClipboard}
        >
          Share
        </button>

        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={clsx(
            `${regularFont.className}`,
            "shadow-md shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 hover:dark:shadow-indigo-700",
            "fixed inset-x-4 bottom-4 z-50 w-auto rounded-3xl shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm",
            "border-2 border-solid border-black bg-white dark:border-none dark:bg-zinc-900",
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
            <div className="flex w-0 flex-1 items-center p-5">
              <div className="radix w-full">
                <Toast.Title className="my-2 text-2xl leading-none">
                  <span className={clsx("text-blue-800 dark:text-indigo-200")}>
                    {tripName}
                  </span>
                  {` code copied to clipboard!`}
                </Toast.Title>
                <Toast.Description className="mt-1 text-xl leading-none">
                  Share it with your friends and family to invite them.
                </Toast.Description>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="my-auto mr-3">
                  <Toast.Close
                    className={clsx(
                      "flex items-center justify-center rounded-2xl border-2 border-solid border-black px-3 pt-2 pb-1 text-xl focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 hover:bg-gray-50 dark:border-white dark:hover:bg-gray-900",
                      "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 hover:dark:shadow-indigo-700",
                    )}
                  >
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
