"use client";

import { Linkedin } from "lucide-react";

import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const t = useTranslations("LandingPage.Section.Footer");

  return (
    <footer className="relative overflow-hidden pt-12 bg-[#254B98] text-white">
      {/* Upper SVG wave */}
      <div className="absolute top-0 left-0 w-full h-auto -translate-y-full pointer-events-none">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,154.7C1120,181,1280,203,1360,213.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full translate-y-full rotate-180 pointer-events-none z-[1]">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,154.7C1120,181,1280,203,1360,213.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{t("Title")}</h2>
          <div className="max-w-md mx-auto">
            <p className="text-sm">{t("Subtitle")}</p>
          </div>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/company/mathyu-s-solutions/"
            target="_blank"
            rel="noreferrer"
            className="ver:text-green-200 transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t border-white mx-6" />
      {/* Copyright */}
      <div className="relative z-10 py-4 text-center text-sm">
        <p>
          &copy; {currentYear} {t("Copyright")}
        </p>
      </div>
    </footer>
  );
}
