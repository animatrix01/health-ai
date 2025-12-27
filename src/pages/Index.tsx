import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { useUserProfile } from "@/hooks/useUserProfile";
import Dashboard from "./Dashboard";
import DietPlan from "./DietPlan";
import ActivityTracker from "./ActivityTracker";
import HealthTips from "./HealthTips";

const Index = () => {
  const { profile, completeOnboarding, updateProfile, isOnboardingComplete } = useUserProfile();

  if (!isOnboardingComplete) {
    return <OnboardingForm onComplete={completeOnboarding} />;
  }

  return (
    <DashboardLayout userProfile={profile}>
      <Routes>
        <Route path="/" element={<Dashboard userProfile={profile} onUpdateProfile={updateProfile} />} />
        <Route path="/diet-plan" element={<DietPlan vegMode={profile.isVeg} />} />
        <Route path="/activity" element={<ActivityTracker />} />
        <Route path="/tips" element={<HealthTips />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Index;
