// filepath: src/lib/initChatWidget.ts

import { marked } from "marked";
import DOMPurify from "dompurify";

export function initChatWidget() {
  // Si ya existe un widget, no lo reinicialices
  const existingWidget = document.querySelector(".n8n-chat-widget");
  if (existingWidget) {
    return;
  }

  // Configurar marked para renderizar markdown
  marked.setOptions({
    breaks: true, // Convierte saltos de línea en <br>
    gfm: true, // Habilita GitHub Flavored Markdown
  }); // Función para procesar markdown y sanitizar el HTML resultante
  function processMarkdown(text: string): string {
    try {
      // Especificar async: false para asegurar que no devuelve una promesa
      const rawHtml = marked.parse(text, { async: false }) as string;
      return DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "code",
          "pre",
          "ol",
          "ul",
          "li",
          "a",
        ],
        ALLOWED_ATTR: ["href", "target"],
      });
    } catch (error) {
      console.error("Error procesando markdown:", error);
      return text;
    }
  }

  let currentSessionId = "";
  // Create and inject styles
  const styles = `    .n8n-chat-widget {
      --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
      --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
      --chat--color-background: var(--n8n-chat-background-color, #ffffff);
      --chat--color-font: var(--n8n-chat-font-color, #333333);
      font-family: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }    .n8n-chat-widget .chat-container {
      position: fixed;
      bottom: 80px;
      right: 16px;
      z-index: 49;
      display: none;
      width: 320px;
      height: 480px;
      background: var(--chat--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
      border: 1px solid rgba(133, 79, 255, 0.2);
      overflow: hidden;
      font-family: inherit;
    }
    @media (min-width: 640px) {
      .n8n-chat-widget .chat-container {
        bottom: 110px;
        right: 32px;
        width: 380px;
        height: 520px;
      }
    }
    .n8n-chat-widget .chat-container.open {
      display: flex;
      flex-direction: column;
    }
    .n8n-chat-widget .brand-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(133, 79, 255, 0.1);
      position: relative;
    }
    .n8n-chat-widget .close-button {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--chat--color-font);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      font-size: 20px;
      opacity: 0.6;
    }
    .n8n-chat-widget .close-button:hover { opacity: 1; }
    .n8n-chat-widget .brand-header img { width: 32px; height: 32px; }
    .n8n-chat-widget .brand-header span {
      font-size: 18px;
      font-weight: 500;
      color: var(--chat--color-font);
    }
    .n8n-chat-widget .new-conversation {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      text-align: center;
      width: 100%;
      max-width: 300px;
    }
    .n8n-chat-widget .welcome-text {
      font-size: 24px;
      font-weight: 600;
      color: var(--chat--color-font);
      margin-bottom: 24px;
      line-height: 1.3;
    }
    .n8n-chat-widget .new-chat-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 16px 24px;
      background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      transition: transform 0.3s;
    }
    .n8n-chat-widget .new-chat-btn:hover { transform: scale(1.02); }
    .n8n-chat-widget .message-icon { width: 20px; height: 20px; }
    .n8n-chat-widget .response-text {
      font-size: 14px;
      color: var(--chat--color-font);
      opacity: 0.7;
      margin: 0;
    }
    .n8n-chat-widget .chat-interface { display: none; flex-direction: column; height: 100%; }
    .n8n-chat-widget .chat-interface.active { display: flex; }
    .n8n-chat-widget .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: var(--chat--color-background);
      display: flex;
      flex-direction: column;
    }
    .n8n-chat-widget .chat-message { padding: 12px 16px; margin: 8px 0; border-radius: 12px; max-width: 80%; word-wrap: break-word; font-size: 14px; line-height: 1.5; }
    .n8n-chat-widget .chat-message.user { background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%); color: white; align-self: flex-end; box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2); border: none; }    .n8n-chat-widget .chat-message.bot { 
      background: var(--chat--color-background); 
      border: 1px solid rgba(133, 79, 255, 0.2); 
      color: var(--chat--color-font); 
      align-self: flex-start; 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    /* Estilos específicos para markdown en mensajes del bot */
    .n8n-chat-widget .chat-message.bot p {
      margin: 0 0 8px 0;
    }
    .n8n-chat-widget .chat-message.bot p:last-child {
      margin-bottom: 0;
    }
    .n8n-chat-widget .chat-message.bot ul,
    .n8n-chat-widget .chat-message.bot ol {
      margin: 8px 0;
      padding-left: 20px;
    }
    .n8n-chat-widget .chat-message.bot li {
      margin: 4px 0;
    }
    .n8n-chat-widget .chat-message.bot code {
      background: rgba(0,0,0,0.05);
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
    }
    .n8n-chat-widget .chat-message.bot pre {
      background: rgba(0,0,0,0.05);
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 8px 0;
    }
    .n8n-chat-widget .chat-message.bot a {
      color: var(--chat--color-primary);
      text-decoration: underline;
    }
    .n8n-chat-widget .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
      align-self: flex-start;
    }
    .n8n-chat-widget .typing-dot {
      width: 6px;
      height: 6px;
      background: var(--chat--color-primary);
      border-radius: 50%;
      opacity: 0.6;
      animation: typing-animation 1.4s infinite;
    }
    .n8n-chat-widget .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .n8n-chat-widget .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing-animation {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .n8n-chat-widget .chat-input { padding: 16px; background: var(--chat--color-background); border-top: 1px solid rgba(133, 79, 255, 0.1); display: flex; gap: 8px; }
    .n8n-chat-widget .chat-input textarea { flex: 1; padding: 12px; border: 1px solid rgba(133, 79, 255, 0.2); border-radius: 8px; background: var(--chat--color-background); color: var(--chat--color-font); resize: none; font-family: inherit; font-size: 14px; }
    .n8n-chat-widget .chat-input textarea::placeholder { color: var(--chat--color-font); opacity: 0.6; }
    .n8n-chat-widget .chat-input button { background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%); color: white; border: none; border-radius: 8px; padding: 0 20px; cursor: pointer; font-family: inherit; font-weight: 500; transition: transform 0.2s; }
    .n8n-chat-widget .chat-input button:hover { transform: scale(1.05); }    .n8n-chat-widget .chat-toggle {
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      border-radius: 9999px;
      background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
      z-index: 50;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }
    @media (min-width: 640px) {
      .n8n-chat-widget .chat-toggle {
        bottom: 32px;
        right: 32px;
        width: 64px;
        height: 64px;
        padding: 14px;
      }
    }
    .n8n-chat-widget .chat-toggle:hover { transform: scale(1.1); }
    .n8n-chat-widget .chat-toggle svg { width: 24px; height: 24px; fill: currentColor; }
    .n8n-chat-widget .chat-toggle .absolute {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      background-color: var(--chat--color-primary);
      opacity: 0.75;
    }
    .n8n-chat-widget .chat-footer { padding: 8px; text-align: center; background: var(--chat--color-background); border-top: 1px solid rgba(133, 79, 255, 0.1); }
    .n8n-chat-widget .chat-footer a { color: var(--chat--color-primary); text-decoration: none; font-size: 12px; opacity: 0.8; transition: opacity 0.2s; font-family: inherit; }
    .n8n-chat-widget .chat-footer a:hover { opacity: 1; }
  `;
  // Load Bricolage Grotesque font
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&display=swap";
  document.head.appendChild(fontLink);

  // Inject styles
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Default configuration
  const defaultConfig = {
    webhook: { url: "", route: "" },
    branding: {
      logo: "",
      name: "",
      welcomeText: "",
      responseTimeText: "",
      sendMessage: "",
      poweredBy: {
        text: "",
        link: "",
      },
    },
    chat: {
      placeholder: "Type your message here...",
      sendButton: "Send",
    },
    style: {
      primaryColor: "",
      secondaryColor: "",
      position: "right",
      backgroundColor: "#ffffff",
      fontColor: "#333333",
    },
  };

  // Merge user config with defaults
  const config = window.ChatWidgetConfig
    ? {
        webhook: {
          ...defaultConfig.webhook,
          ...window.ChatWidgetConfig.webhook,
        },
        branding: {
          ...defaultConfig.branding,
          ...window.ChatWidgetConfig.branding,
        },
        chat: {
          ...defaultConfig.chat,
          ...window.ChatWidgetConfig.chat,
        },
        style: {
          ...defaultConfig.style,
          ...window.ChatWidgetConfig.style,
        },
      }
    : defaultConfig;

  // Prevent multiple initializations in same render cycle
  const lastInit = window.lastChatWidgetInit || 0;
  const now = Date.now();
  if (now - lastInit < 1000) return; // Prevenir inicializaciones múltiples en menos de 1 segundo
  window.lastChatWidgetInit = now;

  // Create widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "n8n-chat-widget";

  // Set CSS variables for colors
  widgetContainer.style.setProperty(
    "--n8n-chat-primary-color",
    config.style.primaryColor
  );
  widgetContainer.style.setProperty(
    "--n8n-chat-secondary-color",
    config.style.secondaryColor
  );
  widgetContainer.style.setProperty(
    "--n8n-chat-background-color",
    config.style.backgroundColor
  );
  widgetContainer.style.setProperty(
    "--n8n-chat-font-color",
    config.style.fontColor
  );

  const chatContainer = document.createElement("div");
  chatContainer.className = `chat-container${
    config.style.position === "left" ? " position-left" : ""
  }`;

  // Render initial UI
  const newConversationHTML = `<div class="brand-header">
       <img src="${config.branding.logo}" alt="${config.branding.name}">
       <span>${config.branding.name}</span>
       <button class="close-button">×</button>
     </div>
     <div class="new-conversation">
       <h2 class="welcome-text">${config.branding.welcomeText}</h2>
       <button class="new-chat-btn">         <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
         </svg>
         ${config.branding.sendMessage}
       </button>
       <p class="response-text">${config.branding.responseTimeText}</p>
     </div>`;

  chatContainer.innerHTML =
    newConversationHTML +
    `<div class="chat-interface">
       <div class="brand-header">
         <img src="${config.branding.logo}" alt="${config.branding.name}">
         <span>${config.branding.name}</span>
         <button class="close-button">×</button>
       </div>
       <div class="chat-messages"></div>
       <div class="chat-input">
         <textarea placeholder="${config.chat.placeholder}" rows="1"></textarea>
         <button type="submit">${config.chat.sendButton}</button>
       </div>
       <div class="chat-footer">
         <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
       </div>
     </div>`;

  const toggleButton = document.createElement("button");
  toggleButton.className = `chat-toggle${
    config.style.position === "left" ? " position-left" : ""
  }`;
  toggleButton.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-message-chatbot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-2.8 9.286a1 1 0 0 0 -1.414 .014a2.5 2.5 0 0 1 -3.572 0a1 1 0 0 0 -1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0 -.014 -1.414m-5.69 -4.286h-.01a1 1 0 1 0 0 2h.01a1 1 0 0 0 0 -2m5 0h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2" /></svg>`;

  widgetContainer.appendChild(chatContainer);
  widgetContainer.appendChild(toggleButton);
  const chatRoot = document.getElementById("chat-widget-root");
  if (chatRoot) {
    chatRoot.appendChild(widgetContainer);
  } else {
    document.body.appendChild(widgetContainer);
  }

  // Element getters con assert de tipo
  const newChatBtn =
    chatContainer.querySelector<HTMLButtonElement>(".new-chat-btn")!;
  const chatInterface =
    chatContainer.querySelector<HTMLElement>(".chat-interface")!;
  const messagesContainer =
    chatContainer.querySelector<HTMLElement>(".chat-messages")!;
  const textarea =
    chatContainer.querySelector<HTMLTextAreaElement>("textarea")!;
  const sendButton = chatContainer.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  )!;

  function generateUUID() {
    return crypto.randomUUID();
  }

  async function startNewConversation() {
    currentSessionId = generateUUID();
    const headerEl = chatContainer.querySelector<HTMLElement>(".brand-header");
    const newConvEl =
      chatContainer.querySelector<HTMLElement>(".new-conversation");
    if (headerEl) headerEl.style.display = "none";
    if (newConvEl) newConvEl.style.display = "none";
    chatInterface.classList.add("active");
    try {
      const response = await fetch(config.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          {
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: { userId: "" },
          },
        ]),
      });
      const responseData = await response.json(); // Mostrar indicador de escritura
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";
      typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Esperar un momento antes de mostrar la respuesta
      await new Promise((resolve) => setTimeout(resolve, 1000));
      typingIndicator.remove();
      const botMsg = document.createElement("div");
      botMsg.className = "chat-message bot";
      const messageText = Array.isArray(responseData)
        ? responseData[0].output
        : responseData.output;
      // Usar markdown para formatear el mensaje
      botMsg.innerHTML = processMarkdown(messageText);
      messagesContainer.appendChild(botMsg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (e) {
      console.error(e);
    }
  }

  async function sendMessage(message: string) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message user";
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    try {
      const response = await fetch(config.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: currentSessionId,
          route: config.webhook.route,
          chatInput: message,
          metadata: { userId: "" },
        }),
      });
      const data = await response.json(); // Primero mostrar el indicador de escritura
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";
      typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Esperar un momento antes de mostrar la respuesta
      await new Promise((resolve) => setTimeout(resolve, 1000));
      typingIndicator.remove();
      const botMessageDiv = document.createElement("div");
      botMessageDiv.className = "chat-message bot";
      const messageText = Array.isArray(data) ? data[0].output : data.output;
      // Usar markdown para formatear el mensaje
      botMessageDiv.innerHTML = processMarkdown(messageText);
      messagesContainer.appendChild(botMessageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
      console.error(error);
    }
  }

  newChatBtn.addEventListener("click", startNewConversation);
  sendButton.addEventListener("click", () => {
    const msg = textarea.value.trim();
    if (msg) {
      sendMessage(msg);
      textarea.value = "";
    }
  });
  textarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const msg = textarea.value.trim();
      if (msg) {
        sendMessage(msg);
        textarea.value = "";
      }
    }
  });
  toggleButton.addEventListener("click", () =>
    chatContainer.classList.toggle("open")
  );
  chatContainer
    .querySelectorAll<HTMLButtonElement>(".close-button")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        chatContainer.classList.remove("open")
      )
    );
}
