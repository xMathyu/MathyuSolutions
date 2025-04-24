"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion as m, useInView } from "framer-motion";
import { theme } from "@/styles/theme";
import { Interactive3DScene } from "@/components/Interactive3DScene";
import { useRef } from "react";

function HeroSection() {
  const t = useTranslations("LandingPage.Section.Hero");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-[#212121] to-[#2b80e0] dark:from-[#0a0a0a] dark:to-[#1a1a1a] min-h-[100dvh] flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Interactive3DScene />
      </div>
      <div
        className={`${theme.spacing.container} ${theme.spacing.section} flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10`}
      >
        <m.div
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <m.h1
            initial={false}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${theme.typography.heading.large} mb-6 text-white leading-tight`}
          >
            {t("TitleOne")}{" "}
            <m.span
              initial={false}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 text-[#2b80e0] dark:text-[#4a2de1] px-4 py-2 rounded-lg inline-block"
            >
              {t("TitleTwo")}
            </m.span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${theme.typography.body.large} text-white/90 dark:text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0`}
          >
            {t("Description")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/#contact"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FFBE1A] hover:bg-yellow-500 dark:bg-[#FFBE1A]/90 dark:hover:bg-[#FFBE1A] text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              {t("Button")}
              <m.span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                →
              </m.span>
            </Link>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-full aspect-square group">
            <m.div
              className="absolute inset-0 bg-black/30 dark:bg-black/60 rounded-2xl z-10 transition-all duration-300 group-hover:bg-black/20 dark:group-hover:bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <Image
              src="/hero.webp"
              alt={t("ImageAlt")}
              fill
              className="object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default HeroSection;
