import clsx from "clsx";
import Link from "next/link";
import { regularFont } from "../../fonts";

export const Footer = () => {
  return (
    <footer
      className={clsx(
        `${regularFont.className}`,
        "text-xl lg:text-xl",
        "pt-6 lg:pt-10",
        "flex flex-col gap-0",
      )}
    >
      <div className={clsx("text-2xl")}>
        &copy;{` ${new Date().getFullYear()} `}
        <Link
          className={clsx(
            "text-2xl lg:text-2xl",
            "text-blue-700 hover:text-blue-700",
            "dark:text-sky-200 dark:hover:text-sky-300",
          )}
          href={"https://github.com/TypeSafe-Travellers"}
          target={"_blank"}
        >
          TypeSafe Travellers
        </Link>{" "}
      </div>
      <div>
        Open-Source —{" "}
        <Link
          className={clsx(
            "text-indigo-700 hover:text-purple-700",
            "dark:text-purple-300 dark:hover:text-purple-400",
          )}
          href={"https://github.com/TypeSafe-Travellers/App"}
          target={"_blank"}
        >
          GitHub
        </Link>
        {" & "}
        <Link
          className={clsx(
            "text-orange-700 hover:text-orange-800",
            "dark:text-orange-400 dark:hover:text-orange-500",
          )}
          href={"https://replit.com/@AyanavaKarmakar/apptypesafetravellers"}
          target={"_blank"}
        >
          Repl.it
        </Link>
      </div>
    </footer>
  );
};
