"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

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
    const newPath = pathname
      ? pathname.replace(`/${currentLocale}`, `/${langCode}`)
      : `/${langCode}`;
    router.push(newPath);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all duration-200">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative h-5 w-5 overflow-hidden rounded-full border border-white/20"
          >
            <Image
              src={currentLanguage.flag}
              alt={currentLanguage.label}
              className="object-cover"
              fill
              sizes="20px"
            />
          </motion.div>
          <span className="hidden sm:inline-block">
            {currentLanguage.label}
          </span>
          <span className="sm:hidden">{currentLanguage.shortLabel}</span>
          <ChevronDown className="h-4 w-4" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:divide-gray-700">
          <div className="px-1 py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => switchLanguage(language.code)}
                    className={`${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-gray-100"
                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-all duration-200`}
                  >
                    <div className="relative h-5 w-5 overflow-hidden rounded-full mr-2">
                      <Image
                        src={language.flag}
                        alt={language.label}
                        className="object-cover"
                        fill
                        sizes="20px"
                      />
                    </div>
                    {language.label}
                    {currentLocale === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600"
                      >
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </motion.div>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
