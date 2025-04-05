import AboutUs from "@/pageComponents/aboutUs/aboutUs";
import ContactUs from "@/pageComponents/contactUs/contactUs";
import HeroSection from "@/pageComponents/hero/Hero";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs/>
      <ContactUs/>
    </>
  );
}
