import { auth } from "@clerk/nextjs/server";
import { CreditCard } from "lucide-react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default async function SubscriptionPage() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }

  const subscriptionPlan = await getUserSubscriptionPlan(userId);
  const router = useRouter();

  const handleUpgrade = async () => {
    router.push('/pricing');
  };

  const handleManageSubscription = async () => {
    // Implementar portal de cliente de Stripe aquí
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });
      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Error al abrir el portal de gestión:', error);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Suscripción"
        text="Gestiona tu suscripción y créditos mensuales"
      />
      <div className="grid gap-8">
        <Alert>
          <CreditCard className="h-4 w-4" />
          <AlertTitle>Plan Actual</AlertTitle>
          <AlertDescription>
            {subscriptionPlan.isPaid ? (
              <>
                Estás en el plan <strong>{subscriptionPlan.name}</strong>
                {subscriptionPlan.isCanceled && " (Cancelado)"}
              </>
            ) : (
              "No tienes una suscripción activa"
            )}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Suscripción</CardTitle>
            <CardDescription>
              Información sobre tu plan y próxima renovación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado:</span>
              <span className="font-medium">
                {subscriptionPlan.status === "active" ? "Activa" : "Inactiva"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Créditos Mensuales:</span>
              <span className="font-medium">{subscriptionPlan.credits}</span>
            </div>
            {subscriptionPlan.isPaid && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próxima Renovación:</span>
                  <span className="font-medium">
                    {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Intervalo:</span>
                  <span className="font-medium">
                    {subscriptionPlan.interval === "month" ? "Mensual" : "Anual"}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {subscriptionPlan.isPaid ? (
          <Button 
            variant="outline"
            className="w-full"
            onClick={handleManageSubscription}
          >
            Gestionar Suscripción
          </Button>
        ) : (
          <Button 
            className="w-full"
            onClick={handleUpgrade}
          >
            Actualizar a Plan de Pago
          </Button>
        )}
      </div>
    </DashboardShell>
  );
} 