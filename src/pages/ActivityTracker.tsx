import { HealthCard } from "@/components/ui/HealthCard";
import { HealthWidget } from "@/components/ui/HealthWidget";
import { Activity, Footprints, Timer, Flame, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", steps: 8500, calories: 320 },
  { day: "Tue", steps: 7200, calories: 280 },
  { day: "Wed", steps: 9800, calories: 380 },
  { day: "Thu", steps: 6500, calories: 250 },
  { day: "Fri", steps: 10200, calories: 420 },
  { day: "Sat", steps: 11500, calories: 480 },
  { day: "Sun", steps: 8432, calories: 340 },
];

export default function ActivityTracker() {
  const totalSteps = weeklyData.reduce((acc, day) => acc + day.steps, 0);
  const avgSteps = Math.round(totalSteps / 7);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center">
          <Activity className="w-6 h-6 text-warning-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Tracker</h1>
          <p className="text-muted-foreground">Track your daily movement and progress</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthWidget
          title="Today's Steps"
          value="8,432"
          subtitle="84% of goal"
          icon={Footprints}
          gradient="primary"
          progress={84}
        />
        <HealthWidget
          title="Active Time"
          value="1h 45m"
          subtitle="Great progress!"
          icon={Timer}
          gradient="secondary"
        />
        <HealthWidget
          title="Calories"
          value="340"
          subtitle="kcal burned"
          icon={Flame}
          gradient="warm"
        />
        <HealthWidget
          title="Weekly Avg"
          value={avgSteps.toLocaleString()}
          subtitle="steps per day"
          icon={TrendingUp}
          gradient="accent"
        />
      </div>

      {/* Weekly Chart */}
      <HealthCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
            <p className="text-sm text-muted-foreground">Steps over the past 7 days</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{totalSteps.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">total steps</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-lg)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar
                dataKey="steps"
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </HealthCard>
    </div>
  );
}
