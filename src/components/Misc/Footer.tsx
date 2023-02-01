import clsx from "clsx";
import Link from "next/link";
import { regularFont } from "../../fonts";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer
      className={clsx(
        `${regularFont.className}`,
        "text-lg lg:text-xl",
        "flex flex-col gap-0",
        "text-center leading-none",
        "pt-6 pb-3 lg:pb-5 lg:pt-10",
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
        <span className={clsx("text-xl lg:text-2xl")}>
          &copy;{` ${new Date().getFullYear()} `}
        </span>
        <Link
          className={clsx(
            "text-xl lg:text-2xl",
            "text-blue-700 hover:text-blue-700",
            "dark:text-sky-200 dark:hover:text-sky-300",
          )}
          href={"https://github.com/TypeSafe-Travellers"}
          target={"_blank"}
        >
          TypeSafe Travellers
        </Link>
        <div>
          {"Open-Source — "}
          <Link
            className={clsx(
              "text-indigo-700 hover:text-purple-700",
              "dark:text-purple-300 dark:hover:text-purple-400",
            )}
            href={"https://github.com/TypeSafe-Travellers/App"}
            target={"_blank"}
          >
            GitHub
          </Link>
          {" & "}
          <Link
            className={clsx(
              "text-orange-700 hover:text-orange-800",
              "dark:text-orange-400 dark:hover:text-orange-500",
            )}
            href={"https://replit.com/@AyanavaKarmakar/trippins?v=1"}
            target={"_blank"}
          >
            Repl.it
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};
