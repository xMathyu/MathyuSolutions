import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/pageComponents/footer/footer";

type Locale = "es" | "en";

const CONTACT_EMAIL = "xmathyu@gmail.com";
const LAST_UPDATED = "2026-05-22";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isES = locale === "es";
  return {
    title: isES
      ? "Política de Privacidad — Calarm"
      : "Privacy Policy — Calarm",
    description: isES
      ? "Política de privacidad de Calarm: qué datos accede la app, dónde se almacenan y cómo se protegen."
      : "Calarm privacy policy: what data the app accesses, where it is stored, and how it is protected.",
  };
}

export default async function CalarmPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") notFound();
  const content = CONTENT[locale as Locale];

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-12 border-b border-border pb-8">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Calarm
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {content.lastUpdatedLabel}{" "}
            <time dateTime={LAST_UPDATED}>
              {new Date(LAST_UPDATED).toLocaleDateString(
                locale === "es" ? "es-ES" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
          </p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead text-lg leading-relaxed text-muted-foreground">
            {content.intro}
          </p>

          {content.sections.map((section, i) => (
            <section key={i} className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="leading-relaxed">
                      {b.bold && (
                        <strong className="font-semibold">{b.bold}</strong>
                      )}
                      {b.bold && " — "}
                      {b.text}
                    </li>
                  ))}
                </ul>
              )}
              {section.paragraphs2?.map((p, j) => (
                <p key={`p2-${j}`} className="mt-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-12 rounded-xl border border-border bg-muted/40 p-6">
            <h2 className="!mt-0 text-xl font-semibold tracking-tight">
              {content.contactHeading}
            </h2>
            <p className="mt-3 leading-relaxed">
              {content.contactBody}
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            {content.developer}
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}

// ----------------------------------------------------------------------------

const CONTENT: Record<Locale, PageContent> = {
  es: {
    title: "Política de Privacidad",
    lastUpdatedLabel: "Última actualización:",
    intro:
      "Calarm es una aplicación de alarmas y recordatorios para iPhone. Nuestra prioridad es proteger tu privacidad: la app está diseñada para funcionar sin servidores propios, sin cuentas, sin publicidad y sin rastreo. Esta política explica exactamente qué datos accede la app y cómo los maneja.",
    sections: [
      {
        heading: "1. Resumen",
        paragraphs: [
          "Calarm no recopila datos personales en servidores propios. No usamos analytics, no rastreamos comportamiento entre apps o sitios web, y no compartimos información con terceros para fines comerciales. Todos tus datos viven en tu iPhone y, opcionalmente, en tu propia base privada de iCloud (a la que solo tú tienes acceso).",
        ],
      },
      {
        heading: "2. Datos que la app accede",
        paragraphs: [
          "Para funcionar, Calarm solicita permisos del sistema iOS para acceder a:",
        ],
        bullets: [
          {
            bold: "Calendario",
            text: "Lectura de eventos de tu app Calendario de Apple para programar alarmas antes de cada uno y detectar enlaces de Microsoft Teams. Los eventos se leen únicamente cuando tienes esta función activada en Ajustes. No se almacenan fuera de tu dispositivo.",
          },
          {
            bold: "Contactos",
            text: "Solo cuando tocas 'Invitar amigos' al crear un recordatorio. Calarm muestra una lista de tus contactos para que selecciones a quién invitar. Los teléfonos seleccionados se pasan a la app Mensajes (Messages) para que tú envíes la invitación. Calarm no almacena ni transmite tus contactos a ningún servidor.",
          },
          {
            bold: "Fotos",
            text: "Solo cuando tocas 'Elegir foto' al crear un recordatorio. La foto seleccionada se asocia al recordatorio y se guarda localmente (y opcionalmente en tu iCloud privado).",
          },
          {
            bold: "Notificaciones y alarmas (AlarmKit)",
            text: "Para programar alarmas del sistema que suenen aunque tu iPhone esté en silencio o bloqueado. Esto usa el framework AlarmKit de Apple — las alarmas se gestionan localmente por iOS.",
          },
        ],
      },
      {
        heading: "3. Dónde se almacenan tus datos",
        paragraphs: [
          "Tus recordatorios (título, notas, fechas, fotos, configuración) se almacenan en dos lugares:",
        ],
        bullets: [
          {
            bold: "Localmente",
            text: "En la base de datos SwiftData de tu iPhone, encriptada con la encriptación de disco completo de iOS.",
          },
          {
            bold: "Tu iCloud privado",
            text: "Mediante CloudKit, en tu propia base de datos privada de iCloud. Apple gestiona esta sincronización con encriptación de extremo a extremo. Mathyu's Solutions no tiene acceso a este contenido.",
          },
        ],
      },
      {
        heading: "4. Compartir recordatorios",
        paragraphs: [
          "Cuando compartes un recordatorio con un amigo, se usa la función CKShare de CloudKit de Apple. El recordatorio se replica en la base privada de la persona invitada. Esta función opera enteramente dentro del ecosistema iCloud de Apple — Mathyu's Solutions no es parte del intercambio y no tiene acceso al contenido compartido.",
        ],
      },
      {
        heading: "5. Lo que NO hacemos",
        bullets: [
          {
            text: "No recopilamos datos personales en servidores propios.",
          },
          {
            text: "No usamos cookies ni identificadores publicitarios.",
          },
          {
            text: "No rastreamos tu actividad entre apps o sitios web.",
          },
          {
            text: "No vendemos, alquilamos ni compartimos tus datos con terceros.",
          },
          {
            text: "No incluimos SDK de analytics, publicidad o marketing.",
          },
          {
            text: "No requerimos crear cuenta ni iniciar sesión en nuestros servicios.",
          },
        ],
      },
      {
        heading: "6. Tus derechos",
        paragraphs: [
          "Como tus datos viven en tu dispositivo y en tu iCloud privado, tú tienes control total sobre ellos en todo momento:",
        ],
        bullets: [
          {
            bold: "Acceso y portabilidad",
            text: "Puedes ver toda tu información directamente en la app.",
          },
          {
            bold: "Eliminación",
            text: "Borrar un recordatorio dentro de la app lo elimina inmediatamente del dispositivo e iCloud. Desinstalar la app elimina toda la data local; para limpiar también iCloud, ve a Ajustes de iOS → tu Apple ID → iCloud → Calarm → desactivar.",
          },
          {
            bold: "Revocar permisos",
            text: "Puedes revocar el acceso a Calendario, Contactos y Fotos en cualquier momento desde Ajustes de iOS → Calarm.",
          },
        ],
        paragraphs2: [
          "Estos derechos cumplen con las disposiciones del GDPR (Reglamento General de Protección de Datos de la UE) y la CCPA (California Consumer Privacy Act).",
        ],
      },
      {
        heading: "7. Privacidad de menores",
        paragraphs: [
          "Calarm está clasificada como 4+ en la App Store y es apta para todas las edades. No recopilamos datos personales de ningún usuario, incluyendo menores de 13 años.",
        ],
      },
      {
        heading: "8. Cambios a esta política",
        paragraphs: [
          "Si actualizamos esta política, la nueva versión se publicará en esta página con una fecha de actualización revisada. Cambios materiales que afecten cómo manejamos datos personales se anunciarán también dentro de la app antes de entrar en vigor.",
        ],
      },
    ],
    contactHeading: "Contacto",
    contactBody:
      "Si tienes preguntas sobre esta política de privacidad o sobre cómo Calarm maneja tus datos, contáctanos:",
    developer: "Calarm es desarrollado por Mathyu's Solutions.",
  },

  en: {
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated:",
    intro:
      "Calarm is an alarms and reminders app for iPhone. Our priority is protecting your privacy: the app is designed to work without our own servers, without accounts, without ads, and without tracking. This policy explains exactly what data the app accesses and how it handles it.",
    sections: [
      {
        heading: "1. Summary",
        paragraphs: [
          "Calarm does not collect personal data on our servers. We do not use analytics, do not track behavior across apps or websites, and do not share information with third parties for commercial purposes. All your data lives on your iPhone and, optionally, in your own iCloud private database (which only you can access).",
        ],
      },
      {
        heading: "2. Data the app accesses",
        paragraphs: [
          "To function, Calarm requests iOS system permissions to access:",
        ],
        bullets: [
          {
            bold: "Calendar",
            text: "Read access to events from your Apple Calendar app, to schedule alarms before each one and detect Microsoft Teams links. Events are read only when you enable this feature in Settings. They are not stored outside your device.",
          },
          {
            bold: "Contacts",
            text: "Only when you tap 'Invite friends' while creating a reminder. Calarm shows your contacts so you can pick whom to invite. The selected phone numbers are handed off to the Messages app for you to send the invitation. Calarm does not store or transmit your contacts to any server.",
          },
          {
            bold: "Photos",
            text: "Only when you tap 'Choose photo' while creating a reminder. The selected photo is attached to the reminder and saved locally (and optionally in your private iCloud).",
          },
          {
            bold: "Notifications and alarms (AlarmKit)",
            text: "To schedule system alarms that ring even when your iPhone is silent or locked. This uses Apple's AlarmKit framework — alarms are managed locally by iOS.",
          },
        ],
      },
      {
        heading: "3. Where your data is stored",
        paragraphs: [
          "Your reminders (title, notes, dates, photos, configuration) are stored in two places:",
        ],
        bullets: [
          {
            bold: "Locally",
            text: "In your iPhone's SwiftData database, encrypted with iOS full-disk encryption.",
          },
          {
            bold: "Your private iCloud",
            text: "Via CloudKit, in your own iCloud private database. Apple manages this sync with end-to-end encryption. Mathyu's Solutions does not have access to this content.",
          },
        ],
      },
      {
        heading: "4. Sharing reminders",
        paragraphs: [
          "When you share a reminder with a friend, Apple's CloudKit CKShare feature is used. The reminder is replicated to the invited person's private database. This feature operates entirely within Apple's iCloud ecosystem — Mathyu's Solutions is not part of the exchange and does not have access to the shared content.",
        ],
      },
      {
        heading: "5. What we do NOT do",
        bullets: [
          { text: "We do not collect personal data on our servers." },
          { text: "We do not use cookies or advertising identifiers." },
          { text: "We do not track your activity across apps or websites." },
          { text: "We do not sell, rent, or share your data with third parties." },
          { text: "We do not include analytics, advertising, or marketing SDKs." },
          { text: "We do not require account creation or sign-in to our services." },
        ],
      },
      {
        heading: "6. Your rights",
        paragraphs: [
          "Because your data lives on your device and in your private iCloud, you have full control over it at all times:",
        ],
        bullets: [
          {
            bold: "Access and portability",
            text: "You can view all your information directly in the app.",
          },
          {
            bold: "Deletion",
            text: "Deleting a reminder inside the app removes it immediately from your device and iCloud. Uninstalling the app removes all local data; to also clear iCloud, go to iOS Settings → your Apple ID → iCloud → Calarm → toggle off.",
          },
          {
            bold: "Revoke permissions",
            text: "You can revoke access to Calendar, Contacts, and Photos at any time from iOS Settings → Calarm.",
          },
        ],
        paragraphs2: [
          "These rights comply with the GDPR (EU General Data Protection Regulation) and CCPA (California Consumer Privacy Act).",
        ],
      },
      {
        heading: "7. Children's privacy",
        paragraphs: [
          "Calarm is rated 4+ on the App Store and is suitable for all ages. We do not collect personal data from any user, including children under 13.",
        ],
      },
      {
        heading: "8. Changes to this policy",
        paragraphs: [
          "If we update this policy, the new version will be published on this page with a revised update date. Material changes affecting how we handle personal data will also be announced in-app before taking effect.",
        ],
      },
    ],
    contactHeading: "Contact",
    contactBody:
      "If you have questions about this privacy policy or about how Calarm handles your data, contact us:",
    developer: "Calarm is developed by Mathyu's Solutions.",
  },
};

// ----------------------------------------------------------------------------

type PageContent = {
  title: string;
  lastUpdatedLabel: string;
  intro: string;
  sections: Section[];
  contactHeading: string;
  contactBody: string;
  developer: string;
};

type Section = {
  heading: string;
  paragraphs?: string[];
  paragraphs2?: string[];
  bullets?: { bold?: string; text: string }[];
};
