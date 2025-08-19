"use client";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted-hook";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <Button onClick={toggleTheme} variant="ghost">
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
