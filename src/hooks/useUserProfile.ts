import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  bloodGroup: string;
  isVeg: boolean;
  onboardingComplete: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  age: 0,
  weight: 0,
  height: 0,
  bloodGroup: "",
  isVeg: false,
  onboardingComplete: false,
};

const getStorageKey = (userId: string) => `healthai_user_profile_${userId}`;

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user and load their profile
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        const storageKey = getStorageKey(user.id);
        const stored = localStorage.getItem(storageKey);
        
        if (stored) {
          try {
            setProfile(JSON.parse(stored));
          } catch {
            setProfile(DEFAULT_PROFILE);
          }
        } else {
          setProfile(DEFAULT_PROFILE);
        }
      }
    };

    loadProfile();
  }, []);

  // Save profile whenever it changes
  useEffect(() => {
    if (userId && profile.onboardingComplete) {
      const storageKey = getStorageKey(userId);
      localStorage.setItem(storageKey, JSON.stringify(profile));
    }
  }, [profile, userId]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (data: Omit<UserProfile, "onboardingComplete">) => {
    setProfile({ ...data, onboardingComplete: true });
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    if (userId) {
      const storageKey = getStorageKey(userId);
      localStorage.removeItem(storageKey);
    }
  };

  return {
    profile,
    updateProfile,
    completeOnboarding,
    resetProfile,
    isOnboardingComplete: profile.onboardingComplete,
  };
}
