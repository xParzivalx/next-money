'use client';

import React from 'react';
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from 'next/link';

export default function SubscriptionSettings() {
  const { userId } = useAuth();

  const { data: userSubscription } = useQuery({
    queryKey: ["userSubscription", userId],
    queryFn: async () => {
      if (!userId) return null;
      const response = await fetch('/api/subscription/details');
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la suscripción');
      }
      return response.json();
    },
    enabled: !!userId,
  });

  const { data: userCredits } = useQuery({
    queryKey: ["userCredits", userId],
    queryFn: async () => {
      if (!userId) return null;
      const response = await fetch('/api/account');
      if (!response.ok) {
        throw new Error('Error al obtener los créditos');
      }
      return response.json();
    },
    enabled: !!userId,
  });

  const currentPlan = userSubscription?.planId || "Sin Plan";
  const credits = userCredits?.credit || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Plan de Suscripción</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona la configuración general de tu cuenta
        </p>
      </div>

      <div className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] p-6 rounded-md">
        <h4 className="text-md font-medium">Tu Plan Actual</h4>
        <p className="text-sm text-muted-foreground">{currentPlan}</p>
        <p className="text-sm text-muted-foreground">Créditos disponibles: {credits}</p>
        <div className="mt-4 space-x-4">
          <Link 
            href="/pricing"
            className="px-4 py-2 border rounded-md hover:bg-accent"
          >
            Ver Planes
          </Link>
          <Link 
            href="/pricing#credits"
            className="px-4 py-2 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C] rounded-md"
          >
            Comprar Créditos
          </Link>
        </div>
      </div>
    </div>
  );
}