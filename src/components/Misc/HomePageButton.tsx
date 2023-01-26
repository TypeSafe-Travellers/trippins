import clsx from "clsx";
import { regularFont } from "../../fonts";
import { useRouter } from "next/router";

export const HomePageButton = () => {
  const { push } = useRouter();

  return (
    <div
      onClick={() => push("/")}
      className={clsx(
        "cursor-pointer",
        "mr-2 mb-2 px-5 pt-3 pb-1",
        "items-center rounded-md text-xl lg:text-2xl",
        "bg-teal-50 text-center text-black",
        "border-2 border-solid border-black",
        "focus:outline-none focus:ring-2 focus:ring-black hover:bg-teal-200",
        "dark:bg-teal-700 dark:text-white dark:focus:ring-gray-500 dark:hover:bg-teal-600",
        `${regularFont.className}`,
      )}
    >
      Return to Home Page
    </div>
  );
};
