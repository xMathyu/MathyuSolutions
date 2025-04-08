"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { theme } from "@/styles/theme";

const ContactUs = () => {
  const t = useTranslations("LandingPage.Section.ContactUs");

  const formSchema = z.object({
    firstName: z.string().min(1, { message: t("Errors.FirstNameRequired") }),
    lastName: z.string().min(1, { message: t("Errors.LastNameRequired") }),
    email: z.string().email({ message: t("Errors.InvalidEmail") }),
    subject: z.string().min(1, { message: t("Errors.SubjectRequired") }),
    message: z.string().min(1, { message: t("Errors.MessageRequired") }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  };

  const onSubmit = (data: FormData) => {
    const templateParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((error) => {
        console.error("FAILED...", error);
        alert(t("Form.ErrorMessage"));
      });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-[#2b80e0]" />,
      title: t("Phone"),
      content: "+51 994 283 802",
      link: "tel:+51994283802",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#2b80e0]" />,
      title: t("Email"),
      content: "mathyusolutions@gmail.com",
      link: "mailto:mathyusolutions@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#2b80e0]" />,
      title: t("Address"),
      content: "Lima, Perú",
      link: "https://maps.google.com",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#2b80e0]" />,
      title: t("WorkingHours"),
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
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
            className="mb-4 px-4 py-1 text-sm inline-block"
          >
            {t("Badge")}
          </Badge>
          <h1
            className={`${theme.typography.heading.large} text-[#212121] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2b80e0] to-[#4a2de1]`}
          >
            {t("Title")}
          </h1>
          <p
            className={`${theme.typography.body.large} text-[#555555] max-w-2xl mx-auto`}
          >
            {t("Description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 h-full"
          >
            <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm flex-1">
              <h2
                className={`${theme.typography.heading.small} text-[#212121]  flex items-center gap-2`}
              >
                <span className="w-1 h-6 bg-[#2b80e0] rounded-full"></span>
                {t("ContactDetails")}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors shrink-0">
                        {info.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-[#212121] mb-0.5">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={
                              info.link.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              info.link.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-sm text-[#555555] hover:text-[#2b80e0] transition-colors block break-words"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-[#555555] break-words">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm flex-1">
              <h2
                className={`${theme.typography.heading.small} text-[#212121]  flex items-center gap-2`}
              >
                <span className="w-1 h-6 bg-[#2b80e0] rounded-full"></span>
                {t("WhyChooseUs.Title")}
              </h2>
              <ul className="space-y-4">
                {[
                  t("WhyChooseUs.Reasons.Reason1"),
                  t("WhyChooseUs.Reasons.Reason2"),
                  t("WhyChooseUs.Reasons.Reason3"),
                ].map((reason, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2b80e0] mt-2 group-hover:scale-125 transition-transform"></div>
                    <p
                      className={`${theme.typography.body.DEFAULT} text-[#555555] group-hover:text-[#212121] transition-colors`}
                    >
                      {reason}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start justify-center lg:sticky lg:top-24 "
          >
            <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
              <CardHeader className="border-b px-6 py-5">
                <CardTitle
                  className={`${theme.typography.heading.small} text-[#212121] flex items-center gap-2`}
                >
                  <span className="w-1 h-6 bg-[#2b80e0] rounded-full"></span>
                  {t("Form.Title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center g p-6 space-y-6 h-full ">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#212121] mb-2 block">
                              {t("Form.FirstName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("Form.FirstName")}
                                {...field}
                                className="focus:ring-[#2b80e0] bg-white h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#212121] mb-2 block">
                              {t("Form.LastName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("Form.LastName")}
                                {...field}
                                className="focus:ring-[#2b80e0] bg-white h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212121] mb-2 block">
                            {t("Form.Email")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("Form.Email")}
                              {...field}
                              className="focus:ring-[#2b80e0] bg-white h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212121] mb-2 block">
                            {t("Form.Subject")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("Form.Subject")}
                              {...field}
                              className="focus:ring-[#2b80e0] bg-white h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#212121] mb-2 block">
                            {t("Form.Message")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("Form.Message")}
                              {...field}
                              className="focus:ring-[#2b80e0] min-h-[160px] resize-none bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#2be0cc] to-[#4a2de1] hover:opacity-90 transition-all duration-300 h-12 text-base font-medium"
                    >
                      {t("Form.Button")}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
