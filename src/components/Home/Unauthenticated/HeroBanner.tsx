import clsx from "clsx";
import { boldFont, semiBoldFont } from "../../../fonts";
import { motion } from "framer-motion";

export const HeroBanner = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
    >
      <div
        className={clsx(
          "text-6xl lg:text-9xl",
          "text-center leading-none",
          `${boldFont.className}`,
        )}
      >
        Welcome to
        <span
          className={clsx(
            "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
            "bg-clip-text text-transparent",
          )}
        >
          {` Trippins!`}
        </span>
      </div>

      <div
        className={clsx(
          "text-4xl lg:text-7xl",
          "text-center",
          "px-5 py-5 lg:px-0 lg:py-0",
          `${boldFont.className}`,
        )}
      >
        The ultimate
        <span
          className={clsx(
            "bg-gradient-to-r from-green-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` group trip planning `}
        </span>
        app.
      </div>

      <div
        className={clsx(
          "text-xl lg:text-5xl",
          "text-center",
          "px-6 lg:px-40",
          `${semiBoldFont.className}`,
        )}
      >
        Say goodbye to the
        <span
          className={clsx(
            "bg-gradient-to-r from-green-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` headache `}
        </span>
        of group trip planning and hello to the
        <span
          className={clsx(
            "bg-gradient-to-r from-green-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` convenience `}
        </span>
        and
        <span
          className={clsx(
            "bg-gradient-to-r from-green-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-500",
            "bg-clip-text text-transparent",
          )}
        >
          {` organization `}
        </span>
        of
        <span
          className={clsx(
            "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
            "bg-clip-text text-transparent",
          )}
        >
          {` Trippins.`}
        </span>
      </div>
    </motion.div>
  );
};
