import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";

export const Navbar = () => {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex flex-row space-x-2 rounded-lg bg-white p-2 dark:bg-gray-800">
        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            href="/"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenu.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium",
                "text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              Home
            </NavigationMenu.Trigger>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            href="/about"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenu.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              Profile
            </NavigationMenu.Trigger>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item asChild>
          <NavigationMenu.Link
            href="/about"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenu.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium",
                "text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              About
            </NavigationMenu.Trigger>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator
          className={clsx(
            "z-10",
            "top-[100%] flex h-2 items-end justify-center overflow-hidden",
            "radix-state-visible:animate-fade-in",
            "radix-state-hidden:animate-fade-out",
            "transition-[width_transform] duration-[250ms] ease-[ease]",
          )}
        >
          <div className="relative top-1 h-2 w-2 rotate-45 bg-white dark:bg-gray-800" />
        </NavigationMenu.Indicator>
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
