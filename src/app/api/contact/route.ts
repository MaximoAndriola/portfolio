import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";

// Remitente de testing de Resend — válido sin verificar dominio propio.
// TODO: cambiar a un remitente del dominio propio (ej. "Maximo <hola@maximoandriola.com.ar>")
// una vez que el dominio esté registrado y verificado en Resend (ver
// CLAUDE.md § "Dominio"). Hasta entonces, el mail de confirmación al
// cliente puede fallar silenciosamente — ver el segundo try/catch abajo.
const FROM_EMAIL = "onboarding@resend.dev";

const SERVICE_OPTIONS = ["Páginas web", "Sistemas a medida", "Automatizaciones", "Otro"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const service = asString(body.service);
  const message = asString(body.message);
  const website = asString(body.website); // honeypot

  // Un humano nunca completa este campo porque no lo ve (display:none en
  // el form). Si llegó completo, es un bot: respondemos como si hubiera
  // salido todo bien, sin mandar ningún mail y sin dar ninguna señal de
  // que fue detectado.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Validación server-side — el frontend ya valida con required/type/
  // minLength, pero nunca hay que confiar solo en eso.
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!SERVICE_OPTIONS.includes(service)) {
    return NextResponse.json({ error: "invalid_service" }, { status: 400 });
  }
  if (!message || message.length < 20) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const payload: ContactPayload = { name, email, phone, service, message };

  if (!process.env.RESEND_API_KEY) {
    // No debería pasar en producción (la key vive en las env vars de
    // Vercel), pero si falta no tiene sentido intentar mandar nada.
    console.error("RESEND_API_KEY no está configurada");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Ojo acá: el SDK de Resend NO rechaza la promesa ante un error de la
  // API (key inválida, from no verificado, etc.) — resuelve normalmente
  // con { data: null, error: {...} }. Un try/catch solo no alcanza, hay
  // que revisar el campo `error` de la respuesta a mano.

  // Notificación a Maximo — esta es la que importa. Si falla, sí es un
  // error real que hay que devolverle al usuario.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT.email,
      replyTo: payload.email,
      subject: `Nueva consulta de ${payload.name} — ${payload.service}`,
      text: [
        `Nombre: ${payload.name}`,
        `Mail: ${payload.email}`,
        `Teléfono: ${payload.phone || "(no puso)"}`,
        `Servicio: ${payload.service}`,
        "",
        "Mensaje:",
        payload.message,
      ].join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("Error enviando la notificación a Maximo:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  // Confirmación automática al cliente — con onboarding@resend.dev como
  // remitente de testing, Resend solo entrega esto de forma confiable a
  // la casilla del dueño de la cuenta; para cualquier otro destinatario
  // puede fallar hasta que haya un dominio propio verificado. No tiene
  // que romper la respuesta al usuario ni mostrarle un error: lo que
  // importa hoy es que la notificación de arriba ya salió.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      subject: "Recibí tu mensaje",
      text: `Recibí tu mensaje, ${payload.name} — te voy a contactar a la brevedad.`,
    });
    if (error) throw error;
  } catch (err) {
    console.error(
      "No se pudo enviar la confirmación al cliente (esperable con el remitente de testing sin dominio verificado):",
      err
    );
  }

  return NextResponse.json({ ok: true });
}
