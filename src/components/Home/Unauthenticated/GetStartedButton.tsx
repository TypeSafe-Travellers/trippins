import clsx from "clsx";
import { regularFont } from "../../../fonts";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export const GetStartedButton = () => {
  return (
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
          "inline-flex select-none items-center justify-center rounded-md px-5 pt-4 pb-2",
          "mx-auto",
          "text-2xl",
          "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 hover:dark:shadow-indigo-700",
          "rounded-md border-2 border-solid border-black dark:border-gray-200",
          "bg-white dark:bg-black",
          "focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
        )}
        onClick={() => signIn(undefined, { callbackUrl: "/" })}
      >
        Get Started
      </button>
    </motion.div>
  );
};
