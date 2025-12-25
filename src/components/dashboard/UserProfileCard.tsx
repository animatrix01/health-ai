import { useState } from "react";
import { HealthCard } from "@/components/ui/HealthCard";
import { User, Calendar, Scale, Ruler, Droplets, Edit2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateBMI, getBMIStatus } from "@/lib/healthUtils";

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  bloodGroup: string;
}

interface UserProfileCardProps {
  user: UserProfile;
  onUpdate?: (updates: Partial<UserProfile>) => void;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function UserProfileCard({ user, onUpdate }: UserProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: user.age.toString(),
    weight: user.weight.toString(),
    height: user.height.toString(),
    bloodGroup: user.bloodGroup,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bmi = calculateBMI(user.weight, user.height);
  const bmiStatus = getBMIStatus(bmi);

  const stats = [
    { icon: Calendar, label: "Age", value: `${user.age} years` },
    { icon: Scale, label: "Weight", value: `${user.weight} kg` },
    { icon: Ruler, label: "Height", value: `${user.height} cm` },
    { icon: Droplets, label: "Blood", value: user.bloodGroup },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!age || age < 1 || age > 120) newErrors.age = "Enter a valid age";
    if (!weight || weight < 20 || weight > 300) newErrors.weight = "Enter a valid weight";
    if (!height || height < 50 || height > 250) newErrors.height = "Enter a valid height";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Select blood group";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && onUpdate) {
      onUpdate({
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        bloodGroup: formData.bloodGroup,
      });
      setIsOpen(false);
    }
  };

  return (
    <HealthCard className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">Health Profile</p>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Health Profile</DialogTitle>
                <DialogDescription>
                  Update your health information. Changes will be reflected across the dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className={errors.weight ? "border-destructive" : ""}
                  />
                  {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className={errors.height ? "border-destructive" : ""}
                  />
                  {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Blood Group</Label>
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
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BMI Display */}
        {bmi > 0 && (
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${
            bmiStatus.color === "success" ? "bg-success/10 border-success/20" :
            bmiStatus.color === "warning" ? "bg-warning/10 border-warning/20" :
            "bg-destructive/10 border-destructive/20"
          }`}>
            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
              <Activity className={`w-5 h-5 ${
                bmiStatus.color === "success" ? "text-success" :
                bmiStatus.color === "warning" ? "text-warning" :
                "text-destructive"
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">BMI</p>
              <p className="text-sm font-semibold text-foreground">
                {bmi} - {bmiStatus.status}
              </p>
            </div>
          </div>
        )}
      </div>
    </HealthCard>
  );
}
