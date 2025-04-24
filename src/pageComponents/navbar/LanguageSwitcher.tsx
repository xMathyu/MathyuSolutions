"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Menu } from "@headlessui/react";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { Fragment, useState } from "react";
import clsx from "clsx";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const languages = [
    {
      code: "en",
      label: "English",
      flag: "/flags/america.svg",
      shortLabel: "EN",
    },
    {
      code: "es",
      label: "Español",
      flag: "/flags/spain.svg",
      shortLabel: "ES",
    },
  ];

  const currentLocale = pathname ? pathname.split("/")[1] : "";
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const switchLanguage = (langCode: string) => {
    if (currentLocale === langCode || isLoading) return;
    setIsLoading(langCode);
    const newPath = pathname
      ? pathname.replace(`/${currentLocale}`, `/${langCode}`)
      : `/${langCode}`;
    router.push(newPath);
  };

  // Variantes de Animación
  const buttonHoverTapVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.04 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <motion.div
            variants={buttonHoverTapVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Menu.Button
              className={clsx(
                "inline-flex items-center gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isScrolled
                  ? "bg-white/30 backdrop-blur-sm text-gray-800 dark:text-gray-100"
                  : "bg-white/20 text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {isLoading === currentLanguage.code ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={currentLanguage.code}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-3.5 w-3.5 sm:h-4 sm:w-4 overflow-hidden rounded-full"
                    >
                      <Image
                        src={currentLanguage.flag}
                        alt={currentLanguage.label}
                        className="object-cover"
                        fill
                        sizes="20px"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.span
                  layout="position"
                  className="hidden sm:inline-block text-xs"
                >
                  {currentLanguage.label}
                </motion.span>
                <motion.span layout="position" className="sm:hidden text-xs">
                  {currentLanguage.shortLabel}
                </motion.span>
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </motion.div>
              </div>
            </Menu.Button>
          </motion.div>

          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                as={motion.div}
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
              >
                <div className="px-1 py-1">
                  {languages.map((language) => (
                    <Menu.Item
                      key={language.code}
                      disabled={
                        isLoading !== null || currentLocale === language.code
                      }
                    >
                      {({ active, disabled }) => (
                        <motion.button
                          variants={menuItemVariants}
                          onClick={() => switchLanguage(language.code)}
                          className={clsx(
                            "group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-all duration-200",
                            {
                              "bg-blue-500 text-white": active && !disabled,
                              "text-gray-700 dark:text-gray-200":
                                !active && !disabled,
                              "opacity-50 cursor-not-allowed": disabled,
                            }
                          )}
                          disabled={disabled}
                        >
                          <div className="relative h-5 w-5 overflow-hidden rounded-full mr-2 border border-gray-200 dark:border-gray-600">
                            <Image
                              src={language.flag}
                              alt={language.label}
                              className="object-cover"
                              fill
                              sizes="20px"
                            />
                          </div>
                          <span className="flex-grow text-left">
                            {language.label}
                          </span>
                          <div className="ml-2 flex h-5 w-5 items-center justify-center">
                            <AnimatePresence mode="wait">
                              {isLoading === language.code && (
                                <motion.div
                                  key="loader-item"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <Loader2
                                    className={clsx(
                                      "h-4 w-4 animate-spin",
                                      active ? "text-white" : "text-blue-500"
                                    )}
                                  />
                                </motion.div>
                              )}
                              {currentLocale === language.code &&
                                isLoading !== language.code && (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 15,
                                    }}
                                  >
                                    <Check
                                      className={clsx(
                                        "h-4 w-4",
                                        active ? "text-white" : "text-blue-500"
                                      )}
                                    />
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        </motion.button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}
