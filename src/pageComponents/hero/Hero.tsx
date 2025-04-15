"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion as m, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const sliderData = [
  {
    image: "/hero.webp",
    titleOne: "Convierte tu idea en",
    titleTwo: "realidad rápido y fácil",
    description: "Olvidate de configuraciones complicadas y enfócate en hacer crecer tu proyecto."
  },
  {
    image: "/make-hero.webp",
    titleOne: "Automatización",
    titleTwo: "inteligente",
    description: "Optimiza tus procesos y aumenta la productividad con nuestras herramientas de automatización."
  },
  {
    image: "/consultoria-hero.webp",
    titleOne: "Consultoría",
    titleTwo: "tecnológica",
    description: "Te ayudamos a tomar las mejores decisiones para tu proyecto tecnológico."
  },
];

const SLIDE_DURATION = 8000; // 8 segundos por slide
const TRANSITION_DURATION = 800; // 800ms para la transición

function HeroSection() {
  const t = useTranslations("LandingPage.Section.Hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      
      if (direction === 'next') {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
      }

      // Reiniciar el progreso inmediatamente
      setProgress(0);
      
      // Permitir nueva transición después de que termine la animación
      setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isTransitioning) return;

    let startTime: number;
    let animationFrame: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed >= SLIDE_DURATION) {
        changeSlide('next');
        return;
      }

      const newProgress = (elapsed / SLIDE_DURATION) * 100;
      setProgress(Math.min(newProgress, 100));
      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [currentSlide, isTransitioning, changeSlide]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <AnimatePresence mode="wait">
        <m.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION / 1000, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src={sliderData[currentSlide].image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </m.div>
      </AnimatePresence>

      <div className={`${theme.spacing.container} ${theme.spacing.section} relative z-20 flex flex-col justify-center min-h-[100dvh]`}>
        <AnimatePresence mode="wait">
          <m.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className={`${theme.typography.heading.large} mb-6 text-white leading-tight`}>
              {sliderData[currentSlide].titleOne}{" "}
              <span className="bg-white dark:bg-gray-800 text-[#2b80e0] dark:text-[#4a2de1] px-4 py-2 rounded-lg">
                {sliderData[currentSlide].titleTwo}
              </span>
            </h1>

            <p className={`${theme.typography.body.large} text-white/90 mb-8`}>
              {sliderData[currentSlide].description}
            </p>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FFBE1A] hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              {t("Button")}
            </Link>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Controles del slider */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeSlide('prev')}
              disabled={isTransitioning}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="w-1/2 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ 
                  width: `${progress}%`,
                  transition: 'width linear'
                }}
              />
            </div>

            <button
              onClick={() => changeSlide('next')}
              disabled={isTransitioning}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
export default HeroSection;