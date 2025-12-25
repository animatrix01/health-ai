import { HealthCard } from "@/components/ui/HealthCard";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isVeg: boolean;
  image?: string;
}

interface MealCardProps {
  mealType: string;
  meal: Meal;
  className?: string;
  style?: CSSProperties;
}

export function MealCard({ mealType, meal, className, style }: MealCardProps) {
  const nutrients = [
    { label: "Calories", value: `${meal.calories} kcal`, color: "text-warning" },
    { label: "Protein", value: `${meal.protein}g`, color: "text-primary" },
    { label: "Carbs", value: `${meal.carbs}g`, color: "text-secondary" },
    { label: "Fat", value: `${meal.fat}g`, color: "text-accent" },
  ];

  return (
    <HealthCard className={cn("relative", className)} style={style}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {mealType}
          </span>
          <h4 className="text-lg font-semibold text-foreground mt-1">{meal.name}</h4>
        </div>
        {meal.isVeg && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success">
            <Leaf className="w-3 h-3" />
            <span className="text-xs font-medium">Veg</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {nutrients.map((nutrient) => (
          <div
            key={nutrient.label}
            className="p-2 rounded-lg bg-muted/50"
          >
            <p className="text-xs text-muted-foreground">{nutrient.label}</p>
            <p className={cn("text-sm font-semibold", nutrient.color)}>
              {nutrient.value}
            </p>
          </div>
        ))}
      </div>
    </HealthCard>
  );
}
