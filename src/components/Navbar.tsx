import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { LogoutButton } from "./LogoutButton";
import { useSession } from "next-auth/react";
import { LoginButton } from "./LoginButton";
import { regularFont } from "../fonts";
import clsx from "clsx";

export const Navbar = () => {
  const { status } = useSession();

  return (
    <NavigationMenu.Root
      className={clsx("relative", `${regularFont.className}`)}
    >
      <NavigationMenu.List
        className={clsx(
          "text-xl",
          "px-2 pt-3 pb-1",
          "flex flex-row space-x-2 rounded-sm",
          "bg-slate-100/90 dark:bg-gray-800",
        )}
      >
        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            href="/"
            className={clsx(
              "px-2 py-3",
              "rounded-lg",
              "hover:text-blue-700 dark:hover:text-sky-300",
            )}
          >
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Only show the profile link if the user is authenticated */}
        {status === "authenticated" && (
          <NavigationMenu.Item asChild>
            <NavigationMenu.Link
              href="/profile"
              className={clsx(
                "rounded-lg px-2 py-3",
                "hover:text-blue-700 dark:hover:text-sky-300",
              )}
            >
              Profile
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}

        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            href="/about"
            className={clsx(
              "rounded-lg px-2 py-3",
              "hover:text-blue-700 dark:hover:text-sky-300",
            )}
          >
            About
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* conditionally render sign in & log out button depending on auth status */}
        <div className="absolute right-5 top-0 pt-3">
          {status === "authenticated" ? <LogoutButton /> : <LoginButton />}
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
