import { MealCard } from "@/components/diet/MealCard";
import { HealthCard } from "@/components/ui/HealthCard";
import { Utensils, Flame, Beef, Wheat, Droplet } from "lucide-react";

interface DietPlanProps {
  vegMode: boolean;
}

const allMeals = {
  breakfast: [
    { name: "Oatmeal with Berries", calories: 350, protein: 12, carbs: 55, fat: 8, isVeg: true },
    { name: "Eggs Benedict", calories: 450, protein: 22, carbs: 30, fat: 25, isVeg: false },
  ],
  lunch: [
    { name: "Quinoa Buddha Bowl", calories: 480, protein: 18, carbs: 65, fat: 15, isVeg: true },
    { name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 25, fat: 18, isVeg: false },
  ],
  dinner: [
    { name: "Vegetable Stir Fry", calories: 380, protein: 14, carbs: 45, fat: 12, isVeg: true },
    { name: "Salmon with Asparagus", calories: 520, protein: 42, carbs: 18, fat: 28, isVeg: false },
  ],
  snacks: [
    { name: "Greek Yogurt Parfait", calories: 180, protein: 15, carbs: 22, fat: 4, isVeg: true },
    { name: "Turkey Wrap", calories: 220, protein: 18, carbs: 20, fat: 8, isVeg: false },
  ],
};

export default function DietPlan({ vegMode }: DietPlanProps) {
  const getMeal = (category: keyof typeof allMeals) => {
    const meals = allMeals[category];
    if (vegMode) {
      return meals.find((m) => m.isVeg) || meals[0];
    }
    return meals[0];
  };

  const totalNutrients = Object.keys(allMeals).reduce(
    (acc, key) => {
      const meal = getMeal(key as keyof typeof allMeals);
      return {
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const summaryItems = [
    { icon: Flame, label: "Calories", value: `${totalNutrients.calories} kcal`, color: "text-warning" },
    { icon: Beef, label: "Protein", value: `${totalNutrients.protein}g`, color: "text-primary" },
    { icon: Wheat, label: "Carbs", value: `${totalNutrients.carbs}g`, color: "text-secondary" },
    { icon: Droplet, label: "Fat", value: `${totalNutrients.fat}g`, color: "text-accent" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center">
          <Utensils className="w-6 h-6 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Diet Plan</h1>
          <p className="text-muted-foreground">
            {vegMode ? "Vegetarian meals selected" : "Personalized meal suggestions"}
          </p>
        </div>
      </div>

      {/* Daily Summary */}
      <HealthCard gradient="primary" className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Daily Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryItems.map((item) => (
            <div key={item.label} className="bg-white/20 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" />
                <span className="text-sm opacity-80">{item.label}</span>
              </div>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </HealthCard>

      {/* Meals Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <MealCard
          mealType="Breakfast"
          meal={getMeal("breakfast")}
          className="animate-fade-in"
          style={{ animationDelay: "0ms" }}
        />
        <MealCard
          mealType="Lunch"
          meal={getMeal("lunch")}
          className="animate-fade-in"
          style={{ animationDelay: "100ms" }}
        />
        <MealCard
          mealType="Dinner"
          meal={getMeal("dinner")}
          className="animate-fade-in"
          style={{ animationDelay: "200ms" }}
        />
        <MealCard
          mealType="Snacks"
          meal={getMeal("snacks")}
          className="animate-fade-in"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
