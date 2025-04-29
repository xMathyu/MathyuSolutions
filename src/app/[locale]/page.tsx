import AboutUs from "@/pageComponents/aboutUs/aboutUs";
import ContactUs from "@/pageComponents/contactUs/contactUs";
import { Footer } from "@/pageComponents/footer/footer";
import HeroSection from "@/pageComponents/hero/Hero";
import Projects from "@/pageComponents/projects/projects";
import { ServicesSection } from "@/components/ServicesSection";
import { ChatBot } from "@/components/chatbot/ChatBot";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <Projects />
      <ContactUs />
      <Footer />
      <div className="fixed z-50">
        <ChatBot />
      </div>
    </main>
  );
}
