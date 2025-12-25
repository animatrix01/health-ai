import { HealthCard } from "@/components/ui/HealthCard";
import { AlertTriangle, TrendingUp, Droplet, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateBMI, getBMIStatus } from "@/lib/healthUtils";

interface Warning {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  icon: typeof AlertTriangle;
}

interface HealthWarningsProps {
  weight: number;
  height: number;
}

export function HealthWarnings({ weight, height }: HealthWarningsProps) {
  const bmi = calculateBMI(weight, height);
  const bmiStatus = getBMIStatus(bmi);

  const warnings: Warning[] = [];

  // Dynamic BMI warning
  if (bmi > 0) {
    if (bmiStatus.status === "Overweight" || bmiStatus.status === "Obese") {
      warnings.push({
        id: "bmi",
        type: "warning",
        title: `${bmiStatus.status} - BMI ${bmi}`,
        description: bmiStatus.description,
        icon: TrendingUp,
      });
    } else if (bmiStatus.status === "Underweight") {
      warnings.push({
        id: "bmi",
        type: "warning",
        title: `${bmiStatus.status} - BMI ${bmi}`,
        description: bmiStatus.description,
        icon: TrendingUp,
      });
    } else {
      warnings.push({
        id: "bmi",
        type: "success",
        title: `Healthy BMI - ${bmi}`,
        description: bmiStatus.description,
        icon: Activity,
      });
    }
  }

  // Low iron warning (can be made dynamic with actual health data)
  warnings.push({
    id: "iron",
    type: "info",
    title: "Low Iron Levels",
    description: "Consider adding iron-rich foods to your diet.",
    icon: Droplet,
  });

  // Activity success (can be made dynamic with actual activity data)
  warnings.push({
    id: "activity",
    type: "success",
    title: "Great Activity!",
    description: "You've exceeded your step goal 5 days this week.",
    icon: Activity,
  });

  const typeStyles = {
    warning: "bg-warning/10 text-warning border-warning/20",
    info: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
  };

  return (
    <HealthCard className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Health Alerts</h3>
      </div>

      <div className="space-y-3">
        {warnings.map((warning, index) => (
          <div
            key={warning.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl border animate-fade-in",
              typeStyles[warning.type]
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <warning.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">{warning.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{warning.description}</p>
            </div>
          </div>
        ))}
      </div>
    </HealthCard>
  );
}
