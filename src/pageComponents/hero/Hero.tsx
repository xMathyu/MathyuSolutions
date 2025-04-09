"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion as m } from "framer-motion";
import { theme } from "@/styles/theme";

function HeroSection() {
  const t = useTranslations("LandingPage.Section.Hero");

  return (
    <div className="bg-gradient-to-br from-[#212121] to-[#2b80e0] min-h-[100dvh] flex items-center">
      <div
        className={`${theme.spacing.container} ${theme.spacing.section} flex flex-col lg:flex-row justify-between items-center gap-12`}
      >
        <m.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1
            className={`${theme.typography.heading.large} mb-6 text-white leading-tight`}
          >
            {t("TitleOne")}{" "}
            <span className="bg-white text-[#2b80e0] px-4 py-2 rounded-lg">
              {t("TitleTwo")}
            </span>
          </h1>

          <p
            className={`${theme.typography.body.large} text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0`}
          >
            {t("Description")}
          </p>

          <Link
            href={t("ButtonLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#FFBE1A] hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {t("Button")}
          </Link>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-full aspect-square">
            <Image
              src="/hero.webp"
              alt={t("ImageAlt")}
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </m.div>
      </div>
    </div>
  );
}

export { HeroSection };
export default HeroSection;
