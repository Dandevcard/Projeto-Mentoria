
import { useTheme } from "@/contexts/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui-components";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn("w-9 px-0", className)}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="animate-scale-in" />
      ) : (
        <Moon size={18} className="animate-scale-in" />
      )}
    </Button>
  );
}
