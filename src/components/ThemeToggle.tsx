import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import * as Toggle from "@radix-ui/react-toggle";
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
  );
};
