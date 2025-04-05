import type { Metadata } from "next";
import { poppins } from "./fonts";
import "./globals.css";

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
    <html lang={locale}>
      <body className={`${poppins.variable} bg-gray-50`}>
        <NextIntlClientProvider>
          <Navbar />
        </NextIntlClientProvider>

        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
