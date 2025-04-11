"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
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
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      {/* Initial floating message */}
      {showInitialMessage && (
        <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-4 shadow-lg max-w-[200px] text-sm animate-fade-in-up">
          <div className="relative">
            ¿Necesitas ayuda? ¡Escríbenos!
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Chatea con nosotros
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-black transform rotate-45"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 rounded-full animate-ping-slow bg-[#25D366] opacity-75"></div>
        <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
