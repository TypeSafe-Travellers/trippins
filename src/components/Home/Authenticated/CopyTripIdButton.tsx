import { type FC } from "react";
import clsx from "clsx";
import { regularFont } from "../../../fonts";
import { motion } from "framer-motion";
import * as Toast from "@radix-ui/react-toast";
import { useMediaQuery } from "../../../hooks";

interface Props {
  tripId: string;
}

export const CopyTripIdButton: FC<Props> = (props) => {
  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(props.tripId);

      // TODO add toast
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
    </motion.div>
  );
};
