import clsx from "clsx";
import { boldFont } from "../../fonts";
import { ProfileDetails } from "./ProfileDetails";
import { EditProfile } from "./EditProfile";

export const ProfileContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "text-center text-4xl lg:text-7xl",
          "mx-auto",
          `${boldFont.className}`,
        )}
      >
        Profile Details
      </div>
      <ProfileDetails />
      <div className="pt-8 text-center">
        <EditProfile />
      </div>
    </>
  );
};
