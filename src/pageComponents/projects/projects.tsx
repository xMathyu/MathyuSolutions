"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    title: "Fa Meng Chuen",
    image: "/FMCP.webp",
    link: "https://famengchuen.com/index.html/",
  },
  {
    title: "Práctica de Examen Docente",
    image: "/PED.webp",
    link: "https://docent-exam-xmathyus-projects.vercel.app/",
  },
  {
    title: "INTI-ETA",
    image: "/IE.webp",
    link: "https://inti-eta.vercel.app/en",
  },
];

export default function Projects() {
  const t = useTranslations("LandingPage.Section.Projects");

  return (
    <section className="bg-[#212121] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-[#F5F5F5] mb-12">
          {t("Title")}
        </h1>
        {projects.length > 3 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="max-w-5xl mx-auto"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <Card className="hover:shadow-lg transition-shadow w-full max-w-[400px] mx-auto">
                  <CardHeader className="overflow-hidden h-[200px]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={project.link}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="rounded-t-lg object-cover w-full h-full"
                      />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-bold text-center">
                      {project.title}
                    </CardTitle>
                    <div className="text-center mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {t("VisitProject")}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow w-full max-w-[400px] mx-auto"
              >
                <CardHeader className="overflow-hidden h-[200px]">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={project.link}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="rounded-t-lg object-cover w-full h-full"
                    />
                  </a>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-bold text-center">
                    {project.title}
                  </CardTitle>
                  <div className="text-center mt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {t("VisitProject")}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
