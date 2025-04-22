"use client";

import { Brain, Code2, Database, Globe, LineChart, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import OurServices3DModel from "./OurServices3DModel";

const serviceIcons = {
  "Software Development": Code2,
  "Technology Consulting": LineChart,
  "Web Development": Globe,
  "Database Management": Database,
  "AI & Automation": Brain,
  "Dedicated Teams": Users,
  // Spanish versions
  "Desarrollo de Software": Code2,
  "Consultoría Tecnológica": LineChart,
  "Desarrollo Web": Globe,
  "Gestión de Base de Datos": Database,
  "IA y Automatización": Brain,
  "Equipos Dedicados": Users,
};

interface Service {
  title: string;
  description: string;
}

export function ServicesSection() {
  const t = useTranslations("LandingPage.Section.Services");

  return (
    <section
      id="services"
      className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#1f1f1f] dark:via-[#1f1f1f] dark:to-[#1f1f1f] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div
        className={`${theme.spacing.container} ${theme.spacing.section} relative`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
            {t("Badge")}
          </Badge>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <h1
              className={`${theme.typography.heading.large} text-[#212121] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2b80e0] to-[#4a2de1]`}
            >
              {t("Title")}
            </h1>
            <div className="w-full lg:w-1/6">
              <OurServices3DModel />
            </div>
          </div>

          <p
            className={`${theme.typography.body.large} text-[#555555] dark:text-neutral-300 max-w-2xl mx-auto`}
          >
            {t("SubTitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(t.raw("Services") as Service[]).map((service, index) => {
            const IconComponent =
              serviceIcons[service.title as keyof typeof serviceIcons] || Code2;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2be0cc]/20 to-[#4a2de1]/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-[#2b80e0]" />
                  </div>
                  <h3
                    className={`${theme.typography.heading.small} text-[#212121] mb-3 dark:text-white`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`${theme.typography.body.DEFAULT} text-[#555555] dark:text-neutral-300`}
                  >
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
