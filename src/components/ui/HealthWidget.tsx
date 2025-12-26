import { cn } from "@/lib/utils";
import { LucideIcon, Clock } from "lucide-react";
import { formatLastUpdated } from "@/lib/healthUtils";

interface HealthWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: "primary" | "secondary" | "accent" | "warm" | "health";
  progress?: number;
  lastUpdated?: Date;
  className?: string;
}

export function HealthWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "primary",
  progress,
  lastUpdated,
  className,
}: HealthWidgetProps) {
  const iconBgClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    warm: "bg-warning/10 text-warning",
    health: "bg-destructive/10 text-destructive",
  };

  const progressBgClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    warm: "bg-warning",
    health: "bg-destructive",
  };

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-5 shadow-card widget-hover",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconBgClasses[gradient]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                progressBgClasses[gradient]
              )}
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{progress}% of daily goal</p>
        </div>
      )}
    </div>
  );
}
