import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";
import { regularFont } from "../fonts";
import { SunIcon, MoonIcon } from "../icons";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const { theme, setTheme } = useTheme();

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
              className="2xl cursor-pointer text-black dark:text-white"
              aria-label="Toggle light/dark mode"
            >
              {lightMode ? <MoonIcon /> : <SunIcon />}
            </button>
          </Toggle.Root>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={4}
          className="radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade inline-flex items-center rounded-md bg-gray-800 px-4 pt-4 pb-2 dark:bg-white"
        >
          <Tooltip.Arrow className="fill-current text-gray-800 dark:text-white" />
          <span
            className={`block text-lg text-white dark:text-black ${regularFont.className}`}
          >
            Toggle Theme
          </span>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
