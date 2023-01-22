import clsx from "clsx";
import { semiBoldFont } from "../../fonts";
import { useSession } from "next-auth/react";

export const ProfileDetails = () => {
  const { data: session } = useSession();
  return (
    <div
      className={clsx(
        "text-2xl lg:text-3xl",
        "mx-10 break-words px-3 pt-6 pb-4 lg:mx-auto lg:px-8",
        "dark:bg-gradient-to-tl dark:from-black/70 dark:via-black/60 dark:to-black/50",
        "shadow-lg shadow-blue-200 hover:shadow-red-200 dark:shadow-indigo-900 dark:hover:shadow-indigo-700",
        "rounded-lg border-4 border-solid border-black dark:border-gray-200",
        "cursor-pointer",
      )}
    >
      <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
        Username: {session?.user?.name}
      </div>
      <div className={clsx("my-2 leading-none", `${semiBoldFont.className}`)}>
        Email: {session?.user?.email}
      </div>
    </div>
  );
};
