import { type NextPage } from "next";
import clsx from "clsx";
import { ThemeToggle } from "../components";
import { boldFont, semiBoldFont } from "../fonts";

const Profile: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-2">
      <div className={clsx("text-center text-7xl", `${boldFont.className}`)}>
        Profile Details
      </div>
      <div
        className={clsx(
          "mx-auto px-8 pt-6 pb-4",
          "bg-white dark:bg-black",
          "rounded-lg border-4 border-solid border-black dark:border-white",
        )}
      >
        <div className={clsx("text-3xl", "my-2", `${semiBoldFont.className}`)}>
          Username: Ayanava Karmakar
        </div>
        <div className={clsx("text-3xl", `${semiBoldFont.className}`)}>
          Email: karmakarayanava2021@gmail.com
        </div>
      </div>
      <div className={clsx("items-center text-center", "pt-5")}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Profile;
