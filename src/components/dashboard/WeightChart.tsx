import { HealthCard } from "@/components/ui/HealthCard";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface WeightChartProps {
  currentWeight: number;
  targetWeight?: number;
}

export function WeightChart({ currentWeight, targetWeight = 70 }: WeightChartProps) {
  // Generate weight data based on current weight
  const generateWeightData = () => {
    const data = [];
    let weight = currentWeight + 2; // Start 2kg higher
    
    for (let i = 1; i <= 6; i++) {
      data.push({
        week: `Week ${i}`,
        weight: Number(weight.toFixed(1)),
        date: new Date(Date.now() - (6 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
      weight -= 0.3 + Math.random() * 0.2; // Gradual decrease
    }
    
    return data;
  };

  const data = generateWeightData();
  const startWeight = data[0].weight;
  const endWeight = data[data.length - 1].weight;
  const weightChange = endWeight - startWeight;
  const isImproving = targetWeight ? Math.abs(endWeight - targetWeight) < Math.abs(startWeight - targetWeight) : weightChange < 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">{payload[0].payload.date}</p>
          <p className="text-sm font-semibold text-foreground">
            Weight: {payload[0].value} kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <HealthCard className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weight Progress</h3>
          <p className="text-sm text-muted-foreground">Last 6 weeks</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isImproving ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
        }`}>
          {isImproving ? (
            <TrendingDown className="w-4 h-4" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {weightChange > 0 ? "+" : ""}{weightChange.toFixed(1)} kg
          </span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Target weight reference line */}
            {targetWeight && (
              <ReferenceLine
                y={targetWeight}
                stroke="hsl(var(--success))"
                strokeDasharray="5 5"
                label={{
                  value: `Target: ${targetWeight}kg`,
                  position: "right",
                  fill: "hsl(var(--success))",
                  fontSize: 12,
                }}
              />
            )}
            
            <Line
              type="monotone"
              dataKey="weight"
              stroke={isImproving ? "hsl(var(--success))" : "hsl(var(--warning))"}
              strokeWidth={3}
              dot={{ fill: isImproving ? "hsl(var(--success))" : "hsl(var(--warning))", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </HealthCard>
  );
}
