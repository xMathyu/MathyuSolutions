"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import emailjs from "emailjs-com";

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
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert(t("Form.SuccessMessage"));
        },
        (error) => {
          console.error("FAILED...", error);
          alert(t("Form.ErrorMessage"));
        }
      );
  };

  return (
    <section className="bg-[#F5F5F5] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#212121] mb-4">
              {t("Title")}
            </h1>
            <p className="text-base text-[#555555] mb-8">{t("Description")}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#212121] mb-2">
              {t("ContactDetails")}
            </h2>
            <p className="text-base text-[#555555]">
              {t("Phone")}:{" "}
              <a href="tel:+1234567890" className="text-[#212121]">
                📞 +51 994 283 802
              </a>
            </p>
            <p className="text-base text-[#555555]">
              {t("Email")}:{" "}
              <a href="mailto:info@example.com" className="text-[#212121]">
                mathyusolutions@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{t("Form.Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Form.FirstName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("Form.FirstName")}
                              {...field}
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
                          <FormLabel>{t("Form.LastName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("Form.LastName")}
                              {...field}
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
                        <FormLabel>{t("Form.Email")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("Form.Email")} {...field} />
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
                        <FormLabel>{t("Form.Subject")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("Form.Subject")} {...field} />
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
                        <FormLabel>{t("Form.Message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("Form.Message")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {t("Form.Button")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
