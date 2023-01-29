import { signIn } from "next-auth/react";
import { regularFont } from "../../fonts";
import clsx from "clsx";
import { motion } from "framer-motion";

export const LoginButton = () => {
  return (
    <button
      type="button"
      aria-label="Log In"
      className={clsx(
        "mr-2 mb-2 px-5 pt-2.5 pb-1",
        "inline-flex items-center rounded-md text-xl",
        " bg-green-100 text-center text-black",
        "border-2 border-solid border-black",
        "focus:outline-none focus:ring-2 focus:ring-black hover:bg-green-200",
        "dark:bg-green-700 dark:text-white dark:focus:ring-gray-500 dark:hover:bg-green-600",
        `${regularFont.className}`,
      )}
      onClick={() => signIn(undefined, { callbackUrl: "/" })}
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
        Sign In
      </motion.div>
    </button>
  );
};
