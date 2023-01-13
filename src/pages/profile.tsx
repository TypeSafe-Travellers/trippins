import { type NextPage } from "next";
import clsx from "clsx";
import { ThemeToggle } from "../components";
import { boldFont, semiBoldFont } from "../fonts";

const Profile: NextPage = () => {
  return (
    <div
      className={clsx(
        "flex min-h-screen justify-center",
        "flex-col gap-2",
        "text-gray-900 dark:text-gray-200",
      )}
    >
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
          "bg-gradient-to-tl from-red-200/20 via-gray-100 to-blue-200/20 hover:from-red-200/30 hover:via-gray-100 hover:to-blue-200/40",
          "dark:bg-gradient-to-tl dark:from-black/70 dark:via-black/60 dark:to-black/50",
          "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-cyan-700",
          "cursor-pointer",
          "rounded-lg border-4 border-solid border-black dark:border-gray-200",
        )}
      >
        <div className={clsx("text-3xl", "my-2", `${semiBoldFont.className}`)}>
          Username: John Doe
        </div>
        <div className={clsx("text-3xl", "my-2", `${semiBoldFont.className}`)}>
          Email: johndoe123@gmail.com
        </div>
      </div>
      <div className={clsx("items-center pt-5 text-center")}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Profile;
