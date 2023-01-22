import type { NextPage } from "next";
import clsx from "clsx";
import { boldFont } from "../fonts";
import { HomePageButton } from "../components";
import { motion } from "framer-motion";

const NotFound: NextPage = () => {
  return (
    <div
      className={clsx(
        "flex min-h-screen",
        "items-center justify-center text-center",
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
        <div className={clsx("flex flex-col", `${boldFont.className}`)}>
          <div className={clsx("text-4xl lg:text-9xl")}>
            Page not found...
            <span className="text-blue-600 dark:text-sky-500"> 404!</span>
          </div>
          <HomePageButton />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
