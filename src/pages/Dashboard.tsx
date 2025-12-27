import { useState, useEffect } from "react";
import { HealthWidget } from "@/components/ui/HealthWidget";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { HealthWarnings } from "@/components/dashboard/HealthWarnings";
import { WeightChart } from "@/components/dashboard/WeightChart";
import { MotivationCard } from "@/components/dashboard/MotivationCard";
import { Footprints, Droplet, Heart, Flame } from "lucide-react";
import { UserProfile } from "@/hooks/useUserProfile";
import { getTimeBasedGreeting, getStepsRemaining } from "@/lib/healthUtils";

interface DashboardProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updates: Partial<UserProfile>) => void;
}

// Simulated health metrics with timestamps
interface HealthMetrics {
  steps: { value: number; lastUpdated: Date };
  water: { value: number; lastUpdated: Date };
  heartRate: { value: number; lastUpdated: Date };
  calories: { value: number; lastUpdated: Date };
}

export default function Dashboard({ userProfile, onUpdateProfile }: DashboardProps) {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    steps: { value: 8432, lastUpdated: new Date(Date.now() - 15 * 60000) }, // 15 mins ago
    water: { value: 6, lastUpdated: new Date(Date.now() - 30 * 60000) }, // 30 mins ago
    heartRate: { value: 72, lastUpdated: new Date(Date.now() - 5 * 60000) }, // 5 mins ago
    calories: { value: 1840, lastUpdated: new Date(Date.now() - 45 * 60000) }, // 45 mins ago
  });

  const stepsGoal = 10000;
  const waterGoal = 8;
  const caloriesGoal = 2000;

  const greeting = getTimeBasedGreeting();
  const stepsRemaining = getStepsRemaining(metrics.steps.value, stepsGoal);

  const user = {
    name: userProfile.name,
    age: userProfile.age,
    weight: userProfile.weight,
    height: userProfile.height,
    bloodGroup: userProfile.bloodGroup,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Mobile Welcome */}
      <div className="lg:hidden">
        <h2 className="text-xl font-bold text-foreground">
          {greeting}, {userProfile.name}!
        </h2>
        <p className="text-sm text-muted-foreground">Here's your health summary</p>
      </div>

      {/* Health Widgets Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthWidget
          title="Steps"
          value={metrics.steps.value.toLocaleString()}
          subtitle={stepsRemaining}
          icon={Footprints}
          gradient="primary"
          progress={Math.round((metrics.steps.value / stepsGoal) * 100)}
          lastUpdated={metrics.steps.lastUpdated}
        />
        <HealthWidget
          title="Water"
          value={metrics.water.value}
          subtitle={`${waterGoal - metrics.water.value} glasses to goal`}
          icon={Droplet}
          gradient="secondary"
          progress={Math.round((metrics.water.value / waterGoal) * 100)}
          lastUpdated={metrics.water.lastUpdated}
        />
        <HealthWidget
          title="Heart Rate"
          value={metrics.heartRate.value}
          subtitle="bpm average"
          icon={Heart}
          gradient="health"
          lastUpdated={metrics.heartRate.lastUpdated}
        />
        <HealthWidget
          title="Calories"
          value={metrics.calories.value.toLocaleString()}
          subtitle="kcal burned"
          icon={Flame}
          gradient="warm"
          progress={Math.round((metrics.calories.value / caloriesGoal) * 100)}
          lastUpdated={metrics.calories.lastUpdated}
        />
      </div>

      {/* Motivation Card */}
      <MotivationCard />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserProfileCard user={user} onUpdate={onUpdateProfile} />
          <WeightChart currentWeight={userProfile.weight} targetWeight={70} />
        </div>
        <div className="lg:col-span-1">
          <HealthWarnings weight={userProfile.weight} height={userProfile.height} />
        </div>
      </div>
    </div>
  );
}
