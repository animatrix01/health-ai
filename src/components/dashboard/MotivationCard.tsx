import { HealthCard } from "@/components/ui/HealthCard";
import { Sparkles, Droplet, Dumbbell } from "lucide-react";

const motivations = [
  {
    icon: Sparkles,
    text: "You're making great progress! Keep up the healthy habits.",
  },
  {
    icon: Droplet,
    text: "Remember to drink water – you're 2 glasses away from your goal!",
  },
  {
    icon: Dumbbell,
    text: "A 15-minute walk can boost your mood and energy levels.",
  },
];

export function MotivationCard() {
  const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];

  return (
    <HealthCard gradient="accent" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center animate-float">
          <randomMotivation.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-1">Daily Motivation</p>
          <p className="text-base font-medium">{randomMotivation.text}</p>
        </div>
      </div>
    </HealthCard>
  );
}
