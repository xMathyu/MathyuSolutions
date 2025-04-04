import AboutUs from "@/pageComponents/aboutUs/aboutUs";
import ContactUs from "@/pageComponents/contactUs/contactUs";
import { Footer } from "@/pageComponents/footer/footer";
import HeroSection from "@/pageComponents/hero/Hero";
import Projects from "@/pageComponents/projects/projects";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Projects />
      <ContactUs />
      <Footer />
    </>
  );
}
