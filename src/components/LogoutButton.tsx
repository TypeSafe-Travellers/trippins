import { signOut } from "next-auth/react";
import clsx from "clsx";
import { regularFont } from "../fonts";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      className={clsx(
        "mt-1 px-5 pt-2 pb-1",
        "inline-flex items-center rounded-md text-base",
        "bg-white text-center text-black",
        "border-2 border-solid border-black",
        "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black",
        "dark:bg-black dark:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-500",
        `${regularFont.className}`,
      )}
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
};
