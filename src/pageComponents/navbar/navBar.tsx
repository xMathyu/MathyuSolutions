"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { theme } from "@/styles/theme";

export function Navbar() {
  const { setTheme } = useTheme();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "default-locale";
  const t = useTranslations("LandingPage.Section.Navbar");

  const navLinks: { href: string; label: string }[] = t.raw("NavItems") as {
    href: string;
    label: string;
  }[];

  const localizedNavLinks = navLinks.map((link) => ({
    ...link,
    href: `/${locale}${link.href}`,
  }));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#") && pathname.includes(href.split("#")[0])) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId) as HTMLElement | null;

      if (element) {
        setMobileMenuOpen(false);

        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-16 shadow-lg bg-gradient-to-r from-[#2be0cc] via-[#2b80e0] to-[#4a2de1]  fixed  w-full z-50"
    >
      <div
        className={`${theme.spacing.container}   h-full flex items-center justify-between px-4 `}
      >
        {/* Logo */}
        <Link href={`/${locale}/#hero`} className="h-full flex items-center">
          <div className="relative h-full w-32">
            <Image
              className="p-1"
              src="/logos/logo.svg"
              alt="Logo Mathyu's Solutions"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center text-white space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-2">
              {localizedNavLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      onClick={(e) => handleNavigation(e, href)}
                      className="hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <div className="flex items-center space-x-2 text-white">
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <Switch
              className="data-[state=checked]:bg-sky-300 data-[state=unchecked]:bg-sky-300"
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg"
          >
            <div className="flex flex-col space-y-2 p-4">
              {localizedNavLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavigation(e, href)}
                  className="text-[#212121] hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
