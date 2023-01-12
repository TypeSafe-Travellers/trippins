import { type NextPage } from "next";
import clsx from "clsx";
import { ThemeToggle } from "../components";
import { boldFont, semiBoldFont } from "../fonts";

const Profile: NextPage = () => {
  return (
    <div className={clsx("flex min-h-screen justify-center", "flex-col gap-2")}>
      <div
        className={clsx(
          "text-center text-7xl",
          "mx-auto",
          `${boldFont.className}`,
        )}
      >
        Profile Details
      </div>
      <div
        className={clsx(
          "mx-auto px-8 pt-6 pb-4",
          "bg-gradient-to-tl from-red-200/20 via-gray-100 to-blue-200/20",
          "dark:bg-black",
          "shadow-lg shadow-blue-200 hover:shadow-red-200",
          "cursor-pointer",
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
