import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutAndAlertButton, ThemeToggle } from "..";
import { regularFont } from "../../fonts";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { status } = useSession();
  const { pathname, push } = useRouter();

  return (
    <NavigationMenu.Root
      className={clsx("relative", `${regularFont.className}`)}
    >
      <NavigationMenu.List
        className={clsx(
          "text-xl",
          "px-2 pt-3 pb-1",
          "flex flex-row space-x-2 rounded-sm",
          "bg-white dark:bg-neutral-900",
          "shadow-xl dark:shadow-2xl dark:shadow-neutral-800",
        )}
      >
        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            onClick={() => push("/")}
            className={clsx(
              `${
                pathname === "/"
                  ? "text-indigo-700 dark:text-indigo-200"
                  : "text-black dark:text-white"
              }`,
              "px-1 py-3 lg:px-2",
              "cursor-pointer rounded-lg",
              "hover:text-blue-700 dark:hover:text-indigo-300",
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              Home
            </motion.div>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Only show the profile link if the user is authenticated */}
        {status === "authenticated" && (
          <NavigationMenu.Item asChild>
            <NavigationMenu.Link
              onClick={() => push("/profile")}
              className={clsx(
                `${
                  pathname === "/profile"
                    ? "text-indigo-700 dark:text-indigo-200"
                    : "text-black dark:text-white"
                }`,
                "cursor-pointer rounded-lg",
                "px-1 py-3 lg:px-2",
                "hover:text-blue-700 dark:hover:text-indigo-300",
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
              >
                Profile
              </motion.div>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}

        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            onClick={() => push("/about")}
            className={clsx(
              `${
                pathname === "/about"
                  ? "text-indigo-700 dark:text-indigo-200"
                  : "text-black dark:text-white"
              }`,
              "cursor-pointer rounded-lg",
              "px-1 py-3 lg:px-2",
              "hover:text-blue-700 dark:hover:text-indigo-300",
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              About
            </motion.div>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* conditionally render sign in & log out button depending on auth status */}
        <div
          className={clsx(
            "absolute right-2 top-0 pt-3",
            "flex flex-row gap-4 lg:gap-6",
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.5 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
          >
            <div className={clsx("pt-2")}>
              <ThemeToggle />
            </div>
          </motion.div>

          {status === "authenticated" ? (
            <LogoutAndAlertButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </NavigationMenu.List>

      <div
        className={clsx(
          "absolute flex justify-center",
          "left-[-20%] top-[100%] w-[140%]",
        )}
        style={{
          perspective: "2000px",
        }}
      >
        <NavigationMenu.Viewport
          className={clsx(
            "relative mt-2 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800",
            "w-radix-navigation-menu-viewport",
            "h-radix-navigation-menu-viewport",
            "radix-state-open:animate-scale-in-content",
            "radix-state-closed:animate-scale-out-content",
            "origin-[top_center] transition-[width_height] duration-300 ease-[ease]",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
};
