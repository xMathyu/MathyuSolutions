interface ChatWidgetConfig {
  webhook: { url: string; route: string };
  branding: {
    logo: string;
    name: string;
    welcomeText: string;
    responseTimeText: string;
    sendMessage: string;
  };
  poweredBy: {
    text: string;
    link: string;
  };
  chat: {
    placeholder: string;
    sendButton: string;
  };
  style: {
    primaryColor: string;
    secondaryColor: string;
    position: string;
    backgroundColor: string;
    fontColor: string;
  };
}

declare global {
  interface Window {
    ChatWidgetConfig?: ChatWidgetConfig;
    lastChatWidgetInit?: number;
  }
}

export {};
