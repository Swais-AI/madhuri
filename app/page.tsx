import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import DashboardCards from "@/components/dashboard/DashboardCards";
import ToolWearTrend from "@/components/dashboard/ToolWearTrend";
export default function Home() {
 return (
  <div className="space-y-6">
    <WelcomeBanner />

    <DashboardCards />

    <ToolWearTrend />
  </div>
);
}
