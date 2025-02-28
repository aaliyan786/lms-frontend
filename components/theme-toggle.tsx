"use client"; // Ensure this runs on the client side

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures the component is mounted before accessing theme
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 hover:bg-accent hover:text-accent-foreground rounded-full"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  );
}
