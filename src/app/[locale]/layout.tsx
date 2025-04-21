import type { Metadata } from "next";
import { poppins } from "./fonts";
import "./globals.css";

import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import WhatsAppButton from "@/components/WhatsAppButton";

// NEXT-INTL SETUP
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/pageComponents/navbar/navBar";

export const metadata: Metadata = {
  title: "Mathyu's Solutions",
  description:
    "Mathyu's Solutions is a software development company that specializes in creating innovative and efficient solutions for businesses.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <ThemeProvider attribute="class">
          <NextIntlClientProvider>
            <Navbar />
          </NextIntlClientProvider>
        </ThemeProvider>

        <NextIntlClientProvider>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
