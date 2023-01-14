import { signOut } from "next-auth/react";
import clsx from "clsx";
import { regularFont } from "../fonts";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      aria-label="Log Out"
      className={clsx(
        "mr-2 mb-2 px-5 pt-2.5 pb-1",
        "inline-flex items-center rounded-md text-xl",
        "bg-red-100 text-center text-black",
        "border-2 border-solid border-black",
        "hover:bg-red-100/75 focus:outline-none focus:ring-2 focus:ring-black",
        "dark:bg-red-600/90 dark:text-white dark:hover:bg-red-600 dark:focus:ring-gray-500",
        `${regularFont.className}`,
      )}
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
};
