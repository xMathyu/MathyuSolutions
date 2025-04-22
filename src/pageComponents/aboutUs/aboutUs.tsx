"use client";

import { useTranslations } from "next-intl";
import { SwiperSlide, Swiper } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { theme } from "@/styles/theme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutUs = () => {
  const t = useTranslations("LandingPage.Section.AboutUs");

  const teamMembers = [
    {
      name: "Mathyu Cardozo",
      role: "CEO",
      avatar: "/avatars/MC.webp",
      bio: "Visionary leader with expertise in business strategy and innovation",
    },
    {
      name: "Aldair Chuman",
      role: "CTO",
      avatar: "/avatars/AC.webp",
      bio: "Technical expert with a passion for scalable architecture",
    },
    {
      name: "Patrick Cuentas",
      role: "Technical Leader",
      avatar: "/avatars/PC.webp",
      bio: "Experienced leader in software development and team management",
    },
    {
      name: "Andrés Torres",
      role: "Full Stack Developer",
      avatar: "/avatars/AT.webp",
      bio: "Full-stack specialist with expertise in modern web technologies",
    },
    {
      name: "Fabrizio Sanchez",
      role: "Full Stack Developer",
      avatar: "/avatars/FS.webp",
      bio: "Software developer with experience in frontend and backend technologies",
    },
  ];

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-[#1f1f1f] dark:via-[#1f1f1f] dark:to-[#1f1f1f] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
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
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm dark:border-white/10 dark:text-white"
          >
            {t("Badge")}
          </Badge>
          <h1
            className={`${theme.typography.heading.large} text-[#212121] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2b80e0] to-[#4a2de1] `}
          >
            {t("Title")}
          </h1>

          <p
            className={`${theme.typography.body.large} text-[#555555] max-w-2xl mx-auto dark:text-neutral-300`}
          >
            {t("SubTitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#2b80e0] mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-[#555555] dark:text-neutral-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300  dark:text-white">
              <h2
                className={`${theme.typography.heading.medium} text-[#212121] mb-4 flex items-center gap-2 dark:text-white`}
              >
                <span className="w-1 h-6 bg-[#2b80e0] rounded-full"></span>
                {t("OurStoryTitle")}
              </h2>
              <p
                className={`${theme.typography.body.DEFAULT} text-[#555555] dark:text-neutral-300`}
              >
                {t("OurStoryDescription")}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300  dark:text-white">
              <h2
                className={`${theme.typography.heading.medium} text-[#212121] mb-4 flex items-center gap-2 dark:text-white`}
              >
                <span className="w-1 h-6 bg-[#2b80e0] rounded-full"></span>
                {t("OurMissionTitle")}
              </h2>
              <p
                className={`${theme.typography.body.DEFAULT} text-[#555555] dark:text-neutral-300`}
              >
                {t("OurMissionDescription")}
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`${theme.typography.heading.medium} text-center text-[#212121] mb-12 dark:text-white`}
          >
            {t("TeamTitle")}
          </h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="max-w-5xl mx-auto pb-12 "
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6">
                      <Avatar className="w-48 h-48 mx-auto overflow-hidden ring-4 ring-[#2b80e0]/20">
                        <AvatarImage
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-[#2be0cc] to-[#4a2de1] text-white dark:text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#2b80e0] text-white px-4 py-1">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    <h3
                      className={`${theme.typography.heading.small} text-[#212121] mb-2 dark:text-white`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`${theme.typography.body.small} text-[#555555] mb-4 dark:text-neutral-300`}
                    >
                      {member.bio}
                    </p>
                  </motion.div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
