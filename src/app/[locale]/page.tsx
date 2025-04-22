import AboutUs from "@/pageComponents/aboutUs/aboutUs";
import ContactUs from "@/pageComponents/contactUs/contactUs";
import { Footer } from "@/pageComponents/footer/footer";
import HeroSection from "@/pageComponents/hero/Hero";
import Projects from "@/pageComponents/projects/projects";
import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* <ThreeScene /> */}
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <Projects />
      <ContactUs />
      <Footer />
    </main>
  );
}
