"use client";

import { useTranslations } from "next-intl";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("LandingPage.Section.Footer");

  const footerSections = [
    {
      title: t("QuickLinks.Title"),
      links: [
        { name: t("QuickLinks.Home"), href: "/" },
        { name: t("QuickLinks.AboutUs"), href: "#about" },
        { name: t("QuickLinks.Services"), href: "#services" },
        { name: t("QuickLinks.Projects"), href: "#projects" },
        { name: t("QuickLinks.Contact"), href: "#contact" },
      ],
    },
    {
      title: t("Services.Title"),
      links: [
        { name: t("Services.WebDevelopment"), href: "#web-development" },
        { name: t("Services.MobileApps"), href: "#mobile-apps" },
        { name: t("Services.CloudSolutions"), href: "#cloud-solutions" },
        { name: t("Services.Consulting"), href: "#consulting" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+51 994 283 802",
      href: "tel:+51994283802",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "mathyusolutions@gmail.com",
      href: "mailto:mathyusolutions@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Lima, Perú",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/mathyu-s-solutions/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/mathyu-solutions",
      label: "GitHub",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/mathyusolutions",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/mathyusolutions",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative overflow-hidden pt-24 bg-gradient-to-br from-[#254B98] to-[#1a3972] dark:from-[#0a0a0a] dark:to-[#1a1a1a] text-white">
      {/* Upper SVG wave */}
      <div className="absolute top-0 left-0 w-full h-auto -translate-y-full pointer-events-none">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,154.7C1120,181,1280,203,1360,213.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white dark:from-blue-300 dark:to-blue-100 mb-2">
                {t("Title")}
              </h2>
              <p className="text-sm text-blue-100/80 dark:text-blue-200/80 max-w-md">
                {t("Subtitle")}
              </p>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center space-x-3 text-sm text-blue-100/80 dark:text-blue-200/80 hover:text-white transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="p-2 rounded-lg bg-white/5 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-white/20 transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links and Services */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * sectionIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * linkIndex }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-blue-100/80 dark:text-blue-200/80 hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:transition-all hover:after:w-full"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Subscription */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold">{t("Newsletter.Title")}</h3>
            <p className="text-sm text-blue-100/80 dark:text-blue-200/80">
              {t("Newsletter.Description")}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t("Newsletter.EmailPlaceholder")}
                className="w-full px-4 py-2 rounded-lg bg-white/5 dark:bg-white/10 border border-white/10 dark:border-white/20 focus:border-white/20 dark:focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 dark:focus:ring-white/30 transition-all text-sm placeholder:text-blue-100/50 dark:placeholder:text-blue-200/50"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-blue-300 text-[#254B98] dark:text-[#0a0a0a] hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                {t("Newsletter.SubscribeButton")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-white/10 dark:border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-blue-100/80 dark:text-blue-200/80">
              &copy; {currentYear} {t("Copyright")}
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/20 transition-colors group"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
