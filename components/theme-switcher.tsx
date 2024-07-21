"use client";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {};

export default function ThemeSwitcher({}: Props) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      size="icon"
      className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800  text-2xl md:text-4xl rounded-lg "
    >
      {theme == "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}
