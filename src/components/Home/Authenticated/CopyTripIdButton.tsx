import clsx from "clsx";
import { regularFont } from "../../../fonts";
import { motion } from "framer-motion";

export const CopyTripIdButton = () => {
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
          "inline-flex select-none items-center justify-center rounded-md px-3 pt-2.5 pb-1",
          "mx-auto",
          "text-xl",
          "shadow-md shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 hover:dark:shadow-indigo-700",
          "rounded-md border-2 border-solid border-black dark:border-gray-200",
          "bg-white dark:bg-black",
          "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
        )}
      >
        Share Trip
      </button>
    </motion.div>
  );
};
