import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("LandingPage.Section.Hero");

  return (
    <div className="bg-[#212121] min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl w-full mx-auto py-16 flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#CFCFCF] leading-tight">
            {t("TitleOne")}{" "}
            <span className="bg-[#CFCFCF] text-[#2E1A05] px-2">
              {t("TitleTwo")}
            </span>
          </h1>

          <p className="text-base text-[#CFCFCF] mb-8 max-w-2xl mx-auto lg:mx-0">
            {t("Description")}
          </p>

          <Link
            href={t("ButtonLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-5 items-center justify-center gap-2 bg-[#FFBE1A] hover:bg-yellow-500 text-black px-8 sm:px-20 py-3 rounded-xl font-medium text-lg mb-6 duration-300 transition-colors"
          >
            {t("Button")}
          </Link>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <Image
            src="/hero.webp"
            alt={t("ImageAlt")}
            width={500}
            height={500}
            className="w-full max-w-md lg:max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
