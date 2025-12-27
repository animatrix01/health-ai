import { HealthCard } from "@/components/ui/HealthCard";
import { 
  Lightbulb, 
  Droplet, 
  Moon, 
  Apple, 
  Dumbbell, 
  Brain,
  Heart,
  Leaf 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: typeof Lightbulb;
  gradient: "primary" | "secondary" | "accent" | "warm" | "health";
}

const tips: Tip[] = [
  {
    id: "1",
    category: "Hydration",
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily. Set reminders every 2 hours to maintain consistent hydration levels.",
    icon: Droplet,
    gradient: "primary",
  },
  {
    id: "2",
    category: "Sleep",
    title: "Quality Sleep",
    description: "Aim for 7-9 hours of sleep. Maintain a consistent sleep schedule and avoid screens 1 hour before bed.",
    icon: Moon,
    gradient: "accent",
  },
  {
    id: "3",
    category: "Nutrition",
    title: "Balanced Diet",
    description: "Include colorful vegetables in every meal. They provide essential vitamins and antioxidants for optimal health.",
    icon: Apple,
    gradient: "secondary",
  },
  {
    id: "4",
    category: "Exercise",
    title: "Move Daily",
    description: "Even 30 minutes of moderate exercise can significantly improve your cardiovascular health and mood.",
    icon: Dumbbell,
    gradient: "warm",
  },
  {
    id: "5",
    category: "Mental Health",
    title: "Mindfulness Practice",
    description: "Take 10 minutes daily for meditation or deep breathing. It reduces stress and improves focus.",
    icon: Brain,
    gradient: "accent",
  },
  {
    id: "6",
    category: "Heart Health",
    title: "Monitor Your Heart",
    description: "Regular check-ups and tracking your heart rate helps in early detection of potential issues.",
    icon: Heart,
    gradient: "health",
  },
];

const gradientClasses = {
  primary: "from-primary/20 to-primary/5 border-primary/20",
  secondary: "from-secondary/20 to-secondary/5 border-secondary/20",
  accent: "from-accent/20 to-accent/5 border-accent/20",
  warm: "from-warning/20 to-warning/5 border-warning/20",
  health: "from-destructive/20 to-destructive/5 border-destructive/20",
};

const iconBgClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  warm: "bg-warning text-warning-foreground",
  health: "bg-destructive text-destructive-foreground",
};

export default function HealthTips() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Health Tips</h1>
          <p className="text-muted-foreground">Personalized recommendations for your wellness journey</p>
        </div>
      </div>

      {/* Featured Tip */}
      <HealthCard gradient="primary" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center animate-float">
            <Leaf className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium opacity-80">Featured Tip</span>
            <h3 className="text-xl font-bold mt-1 mb-2">Start Your Day Right</h3>
            <p className="opacity-90">
              Begin each morning with a glass of warm lemon water. It aids digestion, 
              boosts immunity, and helps you stay hydrated throughout the day.
            </p>
          </div>
        </div>
      </HealthCard>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div
            key={tip.id}
            className={cn(
              "p-5 rounded-2xl border bg-gradient-to-br widget-hover animate-fade-in",
              gradientClasses[tip.gradient]
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                iconBgClasses[tip.gradient]
              )}>
                <tip.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {tip.category}
                </span>
                <h4 className="text-base font-semibold text-foreground">{tip.title}</h4>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
