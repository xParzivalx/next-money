import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { prisma } from "@/db/prisma";
import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { RadarChartSimple } from "@/components/charts/radar-chart-simple";
import { RadialChartGrid } from "@/components/charts/radial-chart-grid";
import { RadialShapeChart } from "@/components/charts/radial-shape-chart";
import { RadialStackedChart } from "@/components/charts/radial-stacked-chart";
import { RadialTextChart } from "@/components/charts/radial-text-chart";

export default function UsagePage() {
  const { userId } = useAuth();

  const { data: userSubscription } = useQuery(
    ["userSubscription", userId],
    async () => {
      if (!userId) return null;
      return await prisma.subscription.findFirst({
        where: { userId },
      });
    },
    { enabled: !!userId }
  );

  const { data: userCredits } = useQuery(
    ["userCredits", userId],
    async () => {
      if (!userId) return null;
      return await prisma.userCredit.findFirst({
        where: { userId },
      });
    },
    { enabled: !!userId }
  );

  const currentPlan = userSubscription?.planId || "Sin Plan";
  const credits = userCredits?.credit || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Uso</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona la configuración general de tu cuenta
        </p>
      </div>

      <div className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] p-6 rounded-md">
        <h4 className="text-md font-medium">Tu Plan Actual</h4>
        <p className="text-sm text-muted-foreground">{currentPlan}</p>
        <p className="text-sm text-muted-foreground">Créditos disponibles: {credits}</p>
      </div>

      <div className="flex flex-col gap-5 pt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialTextChart />
          <AreaChartStacked />
          <BarChartMixed />
          <RadarChartSimple />
        </div>

        <InteractiveBarChart />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialChartGrid />
          <RadialShapeChart />
          <LineChartMultiple />
          <RadialStackedChart />
        </div>
      </div>
    </div>
  );
}