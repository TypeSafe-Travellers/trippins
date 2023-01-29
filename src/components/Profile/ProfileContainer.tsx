import clsx from "clsx";
import { boldFont } from "../../fonts";
import { motion } from "framer-motion";
import { ProfileDetails, EditProfile } from ".";

export const ProfileContainer = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div
          className={clsx(
            "mx-auto",
            "bg-clip-text text-transparent",
            "text-center text-4xl lg:text-7xl",
            "bg-gradient-to-r from-indigo-700 to-fuchsia-700 dark:from-indigo-300 dark:to-fuchsia-300",
            `${boldFont.className}`,
          )}
        >
          Profile Details
        </div>
      </motion.div>

      <ProfileDetails />

      <div className="pt-8 text-center">
        <EditProfile />
      </div>
    </>
  );
};
