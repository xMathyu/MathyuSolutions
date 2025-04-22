"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/styles/theme";
import { useTranslations, useLocale } from "next-intl";
import { initChatWidget } from "@/lib/initChatWidget";

export function ChatWidget() {
  const t = useTranslations("ChatWidget");
  const locale = useLocale();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      // Solo actualizar la configuración cuando cambia el idioma
      const timer = setTimeout(() => {
        updateWidget();
      }, 100);
      return () => clearTimeout(timer);
    }
    updateWidget();
  }, [locale]);

  function updateWidget() {
    window.ChatWidgetConfig = {
      webhook: {
        url: "https://n8n.patrickbuilds.software/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat",
        route: "general",
      },
      poweredBy: {
        text: "",
        link: "",
      },
      branding: {
        logo: "/logos/logo.svg",
        name: t("branding.name"),
        welcomeText: t("branding.welcomeText"),
        responseTimeText: t("branding.responseTimeText"),
        sendMessage: t("branding.sendMessage"),
      },

      chat: {
        placeholder: t("chat.placeholder"),
        sendButton: t("chat.sendButton"),
      },
      style: {
        primaryColor: theme.colors.primary.DEFAULT,
        secondaryColor: theme.colors.primary.dark,
        position: "left",
        backgroundColor: theme.colors.secondary.light,
        fontColor: theme.colors.text.primary,
      },
    };
    initChatWidget();
  }

  return null;
}
