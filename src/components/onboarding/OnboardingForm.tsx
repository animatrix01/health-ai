import { useState } from "react";
import { HealthCard } from "@/components/ui/HealthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, User, Ruler, Scale, Droplets, Leaf, Utensils } from "lucide-react";
import { UserProfile } from "@/hooks/useUserProfile";

interface OnboardingFormProps {
  onComplete: (data: Omit<UserProfile, "onboardingComplete">) => void;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    bloodGroup: "",
    isVeg: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120)
      newErrors.age = "Enter a valid age";
    if (!formData.weight || parseFloat(formData.weight) < 20 || parseFloat(formData.weight) > 300)
      newErrors.weight = "Enter a valid weight";
    if (!formData.height || parseFloat(formData.height) < 50 || parseFloat(formData.height) > 250)
      newErrors.height = "Enter a valid height";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Select blood group";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    onComplete({
      name: formData.name.trim(),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      bloodGroup: formData.bloodGroup,
      isVeg: formData.isVeg,
    });
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to HealthAI</h1>
          <p className="text-muted-foreground">
            {step === 1 ? "Let's personalize your health journey" : "Almost there! One last question"}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        {step === 1 ? (
          <HealthCard className="animate-scale-in">
            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className={errors.age ? "border-destructive" : ""}
                />
                {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2 text-foreground">
                  <Scale className="w-4 h-4 text-primary" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className={errors.weight ? "border-destructive" : ""}
                />
                {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
              </div>

              {/* Height */}
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2 text-foreground">
                  <Ruler className="w-4 h-4 text-primary" />
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className={errors.height ? "border-destructive" : ""}
                />
                {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <Droplets className="w-4 h-4 text-primary" />
                  Blood Group
                </Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                >
                  <SelectTrigger className={errors.bloodGroup ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bloodGroup && <p className="text-xs text-destructive">{errors.bloodGroup}</p>}
              </div>

              <Button onClick={handleNext} className="w-full gradient-primary text-primary-foreground">
                Continue
              </Button>
            </div>
          </HealthCard>
        ) : (
          <HealthCard className="animate-scale-in">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">Diet Preference</h2>
                <p className="text-sm text-muted-foreground">
                  This helps us customize your meal recommendations
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, isVeg: true })}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                    formData.isVeg
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    formData.isVeg ? "bg-secondary" : "bg-muted"
                  }`}>
                    <Leaf className={`w-7 h-7 ${formData.isVeg ? "text-secondary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-medium ${formData.isVeg ? "text-secondary" : "text-foreground"}`}>
                    Vegetarian
                  </span>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, isVeg: false })}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                    !formData.isVeg
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    !formData.isVeg ? "bg-primary" : "bg-muted"
                  }`}>
                    <Utensils className={`w-7 h-7 ${!formData.isVeg ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-medium ${!formData.isVeg ? "text-primary" : "text-foreground"}`}>
                    Non-Vegetarian
                  </span>
                </button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleComplete} className="flex-1 gradient-primary text-primary-foreground">
                  Get Started
                </Button>
              </div>
            </div>
          </HealthCard>
        )}
      </div>
    </div>
  );
}
