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
            "text-center text-4xl lg:text-7xl",
            "mx-auto",
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
