"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { theme } from "@/styles/theme";

// Constantes para estilos y animaciones
const NAVBAR_STYLES = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  },
};

const GRADIENT_STYLES = {
  dark: {
    scrolled: "bg-black/20",
    default: "bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90",
  },
  light: {
    scrolled: "bg-white/80",
    default: "bg-gradient-to-r from-[#2be0cc] via-[#2b80e0] to-[#4a2de1]",
  },
};

const TEXT_STYLES = {
  dark: "text-gray-100 hover:text-white",
  light: {
    scrolled: "text-gray-800 hover:text-gray-900",
    default: "text-white hover:text-white/90",
  },
};

const MOBILE_MENU_STYLES = {
  dark: {
    button: "text-white bg-white/10 hover:bg-white/15",
    menu: "bg-[#1a1a1a]/80 backdrop-blur-[12px] border-t border-white/5",
  },
  light: {
    button: "text-white bg-white/20 hover:bg-white/30",
    menu: "backdrop-blur-[12px] border-t border-white/10 bg-gradient-to-r from-[#2be0cc]/80 via-[#2b80e0]/80 to-[#4a2de1]/80",
  },
};

export function Navbar() {
  const { setTheme, theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "default-locale";
  const t = useTranslations("LandingPage.Section.Navbar");
  const { scrollY } = useScroll();

  // Efecto para manejar el montaje y tema inicial
  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(currentTheme === "dark" || (!currentTheme && isDark));
  }, [currentTheme]);

  // Manejador de scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Manejador de cambio de tema
  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  // Manejador de navegación
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#") && pathname.includes(href.split("#")[0])) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);

      if (element) {
        setMobileMenuOpen(false);
        setActiveLink(href);
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Obtener los enlaces de navegación
  const navLinks: { href: string; label: string }[] = t.raw("NavItems") as {
    href: string;
    label: string;
  }[];

  const localizedNavLinks = navLinks.map((link) => ({
    ...link,
    href: `/${locale}${link.href}`,
  }));

  // Renderizar un placeholder mientras se monta
  if (!mounted) {
    return (
      <nav className="fixed w-full z-50 h-16 bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90">
        <div
          className={`${theme.spacing.container} h-full flex items-center justify-between px-4 relative max-w-7xl mx-auto`}
        >
          <div className="h-full w-24 sm:w-32" />
        </div>
      </nav>
    );
  }

  // Renderizar el componente
  return (
    <motion.nav
      {...NAVBAR_STYLES}
      suppressHydrationWarning
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "h-14 backdrop-blur-md" : "h-16"
      } ${
        currentTheme === "dark"
          ? isScrolled
            ? GRADIENT_STYLES.dark.scrolled
            : GRADIENT_STYLES.dark.default
          : isScrolled
          ? GRADIENT_STYLES.light.scrolled
          : GRADIENT_STYLES.light.default
      }`}
    >
      <div
        className={`${theme.spacing.container} h-full flex items-center justify-between px-4 relative max-w-7xl mx-auto`}
      >
        {/* Logo */}
        <Link
          href={`/${locale}/#hero`}
          className="h-full flex items-center flex-shrink-0"
        >
          <div className="relative h-full w-24 sm:w-32">
            {mounted && (
              <Image
                className="p-1"
                src={
                  currentTheme === "dark"
                    ? "/logos/logo-dark.svg"
                    : "/logos/logo.svg"
                }
                alt="Logo Mathyu's Solutions"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            )}
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4 lg:gap-6">
              {localizedNavLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      onClick={(e) => handleNavigation(e, href)}
                      className={`relative px-2 lg:px-3 py-2 text-[14px] lg:text-[15px] font-medium transition-all duration-200 whitespace-nowrap ${
                        currentTheme === "dark"
                          ? TEXT_STYLES.dark
                          : isScrolled
                          ? TEXT_STYLES.light.scrolled
                          : TEXT_STYLES.light.default
                      }`}
                    >
                      <span className="relative">
                        {label}
                        <motion.span
                          className={`absolute -bottom-0.5 left-0 w-full h-[2px] ${
                            currentTheme === "dark"
                              ? "bg-[#2be0cc]"
                              : isScrolled
                              ? "bg-[#2be0cc]"
                              : "bg-white"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: activeLink === href ? 1 : 0,
                            opacity: activeLink === href ? 1 : 0,
                          }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        />
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 h-full">
          <LanguageSwitcher />
          {mounted && (
            <div
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 h-8 sm:h-9 ${
                currentTheme === "dark"
                  ? "bg-white/10"
                  : isScrolled
                  ? "bg-white/30 backdrop-blur-sm"
                  : "bg-white/20"
              }`}
            >
              <Sun
                className={`h-4 w-4 ${
                  currentTheme === "dark"
                    ? "text-white"
                    : isScrolled
                    ? "text-gray-800"
                    : "text-white"
                }`}
              />
              <Switch
                className="data-[state=checked]:bg-[#2be0cc] data-[state=unchecked]:bg-[#2be0cc]"
                checked={isDarkMode}
                onCheckedChange={handleThemeChange}
              />
              <Moon
                className={`h-4 w-4 ${
                  currentTheme === "dark"
                    ? "text-white"
                    : isScrolled
                    ? "text-gray-800"
                    : "text-white"
                }`}
              />
            </div>
          )}

          <button
            aria-label="Toggle mobile menu"
            className={`md:hidden inline-flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg h-8 sm:h-9 ${
              currentTheme === "dark"
                ? MOBILE_MENU_STYLES.dark.button
                : MOBILE_MENU_STYLES.light.button
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                className={`h-4 w-4 ${
                  currentTheme === "dark"
                    ? "text-white"
                    : isScrolled
                    ? "text-gray-800"
                    : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-4 w-4 ${
                  currentTheme === "dark"
                    ? "text-white"
                    : isScrolled
                    ? "text-gray-800"
                    : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed top-[calc(var(--navbar-height,4rem)+1px)] left-0 w-full shadow-lg ${
              currentTheme === "dark"
                ? MOBILE_MENU_STYLES.dark.menu
                : MOBILE_MENU_STYLES.light.menu
            }`}
          >
            <div className="flex flex-col p-2 gap-1 max-w-7xl mx-auto">
              {localizedNavLinks.map(({ href, label }, index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={href}
                    onClick={(e) => handleNavigation(e, href)}
                    className={`block px-4 py-2.5 text-[15px] font-medium rounded-lg transition-all duration-200 ${
                      currentTheme === "dark"
                        ? `text-gray-200 hover:text-white ${
                            activeLink === href
                              ? "bg-white/15 backdrop-blur-sm"
                              : "hover:bg-white/10 hover:backdrop-blur-sm"
                          }`
                        : isScrolled
                        ? `text-gray-800 ${
                            activeLink === href
                              ? "bg-[#2be0cc]/20 backdrop-blur-sm"
                              : "hover:bg-[#2be0cc]/10 hover:backdrop-blur-sm"
                          }`
                        : `text-white hover:text-white/90 ${
                            activeLink === href
                              ? "bg-white/20 backdrop-blur-sm"
                              : "hover:bg-white/10 hover:backdrop-blur-sm"
                          }`
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
