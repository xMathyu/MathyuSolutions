"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion as m, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";

const sliderData = [
  {
    image: "/LANDING-PAGE-MATHYUS.webp",
    titleKey: "LandingPage.Section.Hero.TitleOne",
    titleTwoKey: "LandingPage.Section.Hero.TitleTwo",
    descriptionKey: "LandingPage.Section.Hero.Description"
  },
  {
    image: "/LANDING-PAGE2-MATHYUS.webp",
    titleKey: "LandingPage.Section.Hero.Slides.1.TitleOne",
    titleTwoKey: "LandingPage.Section.Hero.Slides.1.TitleTwo",
    descriptionKey: "LandingPage.Section.Hero.Slides.1.Description"
  },
  {
    image: "/LANDING-PAGE3-MATHYUS.webp",
    titleKey: "LandingPage.Section.Hero.Slides.2.TitleOne",
    titleTwoKey: "LandingPage.Section.Hero.Slides.2.TitleTwo",
    descriptionKey: "LandingPage.Section.Hero.Slides.2.Description"
  }
];


const SLIDE_DURATION = 8000;
const TRANSITION_DURATION = 300;

function HeroSection() {
  const t = useTranslations();
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

      setProgress(0);

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
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#1a0b2e]">
      <AnimatePresence mode="wait">
        <m.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION / 1000, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/90 to-[#1a0b2e]/95" />
          <Image
            src={sliderData[currentSlide].image}
            alt={t("LandingPage.Section.Hero.ImageAlt")}
            fill
            className="object-cover opacity-20 blur-[2px]"
            priority
          />
        </m.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto px-4 min-h-[100dvh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <m.h1 className="text-4xl md:text-6xl font-bold text-white">
                <span className="block mb-4">
                  {t(sliderData[currentSlide].titleKey)}
                </span>
                <span className="text-[#2b80e0] px-6 py-2 rounded-xl inline-block">
                  {t(sliderData[currentSlide].titleTwoKey)}
                </span>
              </m.h1>

              <m.p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {t(sliderData[currentSlide].descriptionKey)}
              </m.p>

              <m.div>
                <Link
                  href={t("LandingPage.Section.Hero.ButtonLink")}
                  className="inline-flex items-center justify-center bg-[#FFBE1A] hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
                >
                  {t("LandingPage.Section.Hero.Button")}
                </Link>
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles del slider */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => changeSlide('prev')}
              disabled={isTransitioning}
              aria-label={t("LandingPage.Section.Hero.PrevSlide")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
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
              aria-label={t("LandingPage.Section.Hero.NextSlide")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
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