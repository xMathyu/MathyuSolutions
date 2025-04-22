"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+51994283802",
  message = "Hola, me gustaría obtener más información sobre sus servicios.",
}) => {
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(false);
    }, 5000); // Message disappears after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  return (
    <div className="fixed bottom-[88px] right-4 sm:bottom-[112px] sm:right-8 z-50">
      {" "}
      {/* Initial floating message */}{" "}
      {showInitialMessage && (
        <div className="absolute -left-44 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg px-3 py-2 shadow-lg max-w-[160px] text-sm font-medium animate-fade-in-up">
          <div className="relative flex items-center">
            ¿Necesitas ayuda? ¡Escríbenos!
            <div className="absolute top-1/2 -right-1.5 w-2.5 h-2.5 bg-white dark:bg-gray-800 transform rotate-45 -translate-y-1/2"></div>
          </div>
        </div>
      )}
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -left-36 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Chatea con nosotros
          <div className="absolute top-1/2 -right-1 w-2 h-2 bg-black transform rotate-45 -translate-y-1/2"></div>
        </div>
      )}
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 rounded-full animate-ping-slow bg-[#25D366] opacity-75"></div>
        <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
