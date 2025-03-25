import React from "react";
import { cn } from "@/lib/utils";

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none btn-hover",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-secondary/90": variant === "secondary",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "underline-offset-4 hover:underline text-primary": variant === "link",
          
          "text-sm px-3 py-1.5 h-8": size === "sm",
          "text-sm px-4 py-2 h-10": size === "md",
          "text-base px-6 py-2.5 h-12": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Container component
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container container-padding mx-auto", className)}>
      {children}
    </div>
  );
}

// Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

export function Card({ children, className, glassmorphism = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border shadow-sm hover-card-effect",
        {
          "glass glass-dark": glassmorphism,
          "bg-card text-card-foreground": !glassmorphism,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;
}

// Badge component for tags
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

export function Badge({ children, variant = "default", className, onClick }: BadgeProps) {
  return (
    <span
      className={cn(
        "pill",
        {
          "bg-primary/10 text-primary border border-primary/20": variant === "primary",
          "bg-secondary/10 text-secondary border border-secondary/20": variant === "secondary",
          "bg-accent/10 text-accent-foreground border border-accent/20": variant === "default",
          "border border-border": variant === "outline",
        },
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

// Section component
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}

export function Section({ children, className, hero = false }: SectionProps) {
  return (
    <section className={cn(hero ? "hero-section" : "section", className)}>
      {children}
    </section>
  );
}

// Divider component
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-t border-border my-4", className)} />;
}
