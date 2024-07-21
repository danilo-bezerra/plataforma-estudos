"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

type Props = {};

type Theme = "dark" | "light";

export default function ThemeSwitcher({}: Props) {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    const newTheme = theme == "dark" ? "light" : "dark";

    localStorage.setItem("@theme", newTheme);
    setTheme(newTheme);
    document.body.classList.toggle("dark");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("@theme");

    if (savedTheme) {
      setTheme(savedTheme as SetStateAction<Theme>);
      document.body.classList.add(savedTheme);
    }
  }, []);

  return (
    <Button onClick={toggleTheme} variant="ghost" className="dark:text-white">
      {theme == "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}
