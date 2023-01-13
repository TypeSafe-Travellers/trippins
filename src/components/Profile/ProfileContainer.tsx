import clsx from "clsx";
import { boldFont } from "../../fonts";
import { ProfileDetails } from "./ProfileDetails";

export const ProfileContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "text-center text-7xl",
          "mx-auto",
          `${boldFont.className}`,
        )}
      >
        Profile Details
      </div>
      <ProfileDetails />
    </>
  );
};
