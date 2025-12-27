// Health calculation utilities

export function calculateBMI(weight: number, heightCm: number): number {
  if (!weight || !heightCm || heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weight / (heightM * heightM)).toFixed(1));
}

export function getBMIStatus(bmi: number): {
  status: string;
  color: "success" | "warning" | "destructive";
  description: string;
} {
  if (bmi === 0) {
    return {
      status: "Unknown",
      color: "warning",
      description: "Complete your profile to calculate BMI",
    };
  }
  if (bmi < 18.5) {
    return {
      status: "Underweight",
      color: "warning",
      description: "Consider consulting a nutritionist",
    };
  }
  if (bmi < 25) {
    return {
      status: "Normal",
      color: "success",
      description: "You're in a healthy weight range",
    };
  }
  if (bmi < 30) {
    return {
      status: "Overweight",
      color: "warning",
      description: "Consider a balanced diet and exercise",
    };
  }
  return {
    status: "Obese",
    color: "destructive",
    description: "Consult a healthcare professional",
  };
}

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function formatLastUpdated(timestamp: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export interface HealthMetric {
  value: string;
  lastUpdated: Date;
}

export function getStepsRemaining(current: number, goal: number): string {
  const remaining = goal - current;
  if (remaining <= 0) return "Goal achieved! 🎉";
  return `${remaining.toLocaleString()} steps to goal`;
}
