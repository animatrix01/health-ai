import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { UserProfile } from "@/hooks/useUserProfile";

interface DashboardLayoutProps {
  children: ReactNode;
  userProfile: UserProfile;
}

export function DashboardLayout({ children, userProfile }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header userName={userProfile.name} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
