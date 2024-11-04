import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/email";
import { emailConfig } from "@/config/email";
import { url } from "@/lib";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const { email, locale = "es" } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generar token primero
    const token = crypto.randomUUID();

    // Crear o actualizar suscriptor
    const subscriber = await prisma.subscribers.upsert({
      where: { email },
      update: { 
        token,
        status: "PENDING",
        locale,
      },
      create: {
        email,
        token,
        status: "PENDING",
        locale,
      },
    });

    // Enviar email de confirmación
    await resend.emails.send({
      from: emailConfig.from,
      to: email,
      subject: "Confirma tu suscripción a NotasAI",
      html: `
        <h1>¡Gracias por suscribirte a NotasAI!</h1>
        <p>Por favor, confirma tu suscripción haciendo clic en el siguiente enlace:</p>
        <a href="${url(`confirm/${token}`).href}">Confirmar suscripción</a>
      `
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
