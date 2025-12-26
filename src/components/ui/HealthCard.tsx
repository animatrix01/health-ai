import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface HealthCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "secondary" | "accent" | "warm" | "health" | "none";
  animate?: boolean;
  style?: CSSProperties;
}

export function HealthCard({
  children, 
  className, 
  gradient = "none",
  animate = true,
  style
}: HealthCardProps) {
  const gradientClasses = {
    primary: "gradient-primary text-primary-foreground",
    secondary: "gradient-secondary text-secondary-foreground",
    accent: "gradient-accent text-accent-foreground",
    warm: "gradient-warm text-warning-foreground",
    health: "gradient-health text-destructive-foreground",
    none: "bg-card text-card-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-card",
        gradientClasses[gradient],
        animate && "widget-hover",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
