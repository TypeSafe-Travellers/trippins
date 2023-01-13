import clsx from "clsx";
import { type NextPage } from "next";
import { ProfileContainer, ThemeToggle } from "../components";

const Profile: NextPage = () => {
  return (
    <div
      className={clsx(
        "flex min-h-screen justify-center",
        "flex-col gap-2",
        "text-gray-900 dark:text-zinc-200",
      )}
    >
      <ProfileContainer />
      <div className={clsx("items-center pt-5 text-center")}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Profile;
