import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import React from "react";

// type Props = {};

export const Navbar = () => {
  return (
    <NavigationMenuPrimitive.Root className="relative">
      <NavigationMenuPrimitive.List className="flex flex-row space-x-2 rounded-lg bg-white p-2 dark:bg-gray-800">
        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="/"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenuPrimitive.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium",
                "text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              Home
            </NavigationMenuPrimitive.Trigger>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="/about"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenuPrimitive.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              Resources
            </NavigationMenuPrimitive.Trigger>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="/about"
            className={clsx(
              "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
            )}
          >
            <NavigationMenuPrimitive.Trigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900",
                "text-sm font-medium",
                "text-gray-700 dark:text-gray-100",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              About
            </NavigationMenuPrimitive.Trigger>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Indicator
          className={clsx(
            "z-10",
            "top-[100%] flex h-2 items-end justify-center overflow-hidden",
            "radix-state-visible:animate-fade-in",
            "radix-state-hidden:animate-fade-out",
            "transition-[width_transform] duration-[250ms] ease-[ease]",
          )}
        >
          <div className="relative top-1 h-2 w-2 rotate-45 bg-white dark:bg-gray-800" />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <div
        className={clsx(
          "absolute flex justify-center",
          "left-[-20%] top-[100%] w-[140%]",
        )}
        style={{
          perspective: "2000px",
        }}
      >
        <NavigationMenuPrimitive.Viewport
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
    </NavigationMenuPrimitive.Root>
  );
};
