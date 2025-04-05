"use client";

import { useTranslations } from "next-intl";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AboutUs = () => {
  const t = useTranslations("LandingPage.Section.AboutUs");

  const teamMembers = [
    { name: "Mathyu Cardozo", role: "CEO", avatar: "/avatars/person.jpg" },
    { name: "Aldair Chuman", role: "Developer", avatar: "/avatars/be.webp" },
    {
      name: "Patrick Cuentas",
      role: "Developer",
      avatar: "/avatars/person.jpg",
    },
  ];

  return (
    <section className="bg-[#F5F5F5] py-16 px-4 text-center">
      {/* About Us Section */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#212121] leading-tight">
          {t("Title")}
        </h1>
        <p className="text-base text-[#555555] mb-8">{t("SubTitle")}</p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 text-center lg:text-left">
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-[#212121] mb-4">
            {t("OurStoryTitle")}
          </h2>
          <p className="text-base text-[#555555]">{t("OurStoryDescription")}</p>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-[#212121] mb-4">
            {t("OurMissionTitle")}
          </h2>
          <p className="text-base text-[#555555]">
            {t("OurMissionDescription")}
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#212121] mb-8">
          {t("TeamTitle")}
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-5xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              {/* Avatar */}
              <Avatar className="w-60 h-60 mb-4 flex items-center justify-center mx-auto">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-3xl font-bold">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Name */}
              <h3 className="text-lg font-bold text-[#212121] mt-2">{member.name}</h3>
              {/* Role */}
              <p className="text-sm text-[#555555]">{member.role}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AboutUs;
