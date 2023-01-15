import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { regularFont } from "../fonts";
import { SunIcon, MoonIcon } from "../icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lightMode, setLightMode] = useState(theme === "light" ? true : false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Toggle.Root
            defaultPressed={lightMode}
            onPressedChange={setLightMode}
            asChild
          >
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className={clsx(
                "cursor-pointer",
                "text-black dark:text-gray-200",
              )}
              aria-label="Toggle light/dark mode"
            >
              {lightMode ? <MoonIcon /> : <SunIcon />}
            </button>
          </Toggle.Root>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={4}
          className={clsx(
            "radix-side-top:animate-slide-down-fade",
            "radix-side-right:animate-slide-left-fade",
            "radix-side-bottom:animate-slide-up-fade",
            "radix-side-left:animate-slide-right-fade",
            "bg-gray-900 dark:bg-gray-200",
            "mr-5 rounded-md px-4 pt-4 pb-2",
            "inline-flex items-center",
          )}
        >
          <Tooltip.Arrow
            className={clsx("fill-current", "text-gray-900 dark:text-gray-200")}
          />
          <span
            className={clsx(
              "block text-lg text-gray-200 dark:text-gray-900",
              `${regularFont.className}`,
            )}
          >
            Toggle Theme
          </span>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
