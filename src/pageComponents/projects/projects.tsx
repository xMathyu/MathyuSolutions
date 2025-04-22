"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { theme } from "@/styles/theme";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import OurProjects3DModel from "@/components/OurProjects3DModel";

const projects = [
  {
    title: "Fa Meng Chuen",
    image: "/FMCP.webp",
    link: "https://famengchuen.com/index.html/",
    description:
      "E-commerce platform for traditional Chinese medicine products",
    tags: ["E-commerce", "React", "Next.js"],
  },
  {
    title: "Práctica de Examen Docente",
    image: "/PED.webp",
    link: "https://docent-exam-xmathyus-projects.vercel.app/",
    description: "Educational platform for teacher exam preparation",
    tags: ["Education", "Vue.js", "Tailwind"],
  },
  {
    title: "INTI-ETA",
    image: "/IE.webp",
    link: "https://inti-eta.vercel.app/en",
    description: "Industrial automation and control system",
    tags: ["Automation", "React", "TypeScript"],
  },
];

const ProjectCard = ({
  project,
  index,
  t,
}: {
  project: (typeof projects)[0];
  index: number;
  t: (key: string) => string;
}) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent  z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-white/10 backdrop-blur-sm text-white border-0 dark:text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-white text-sm mb-4">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-[#2be0cc] transition-colors duration-200"
          >
            {t("VisitProject")}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3
          className={`${theme.typography.heading.small} text-[#212121] mb-2 dark:text-neutral-300`}
        >
          {project.title}
        </h3>
      </div>
    </Card>
  </m.div>
);

export default function Projects() {
  const t = useTranslations("LandingPage.Section.Projects");

  return (
    <section
      id="project"
      className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#1f1f1f] dark:via-[#1f1f1f] dark:to-[#1f1f1f] relative overflow-hidden "
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div
        className={`${theme.spacing.container} ${theme.spacing.section} relative`}
      >
        <m.div
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
              <OurProjects3DModel />
            </div>
          </div>

          <p
            className={`${theme.typography.body.large} text-[#555555] max-w-2xl mx-auto dark:text-neutral-300`}
          >
            {t("SubTitle")}
          </p>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
