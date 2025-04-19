"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Interactive3DScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      setMousePosition({ x, y });
      container.style.setProperty("--mouse-x", `${x * 100}%`);
      container.style.setProperty("--mouse-y", `${y * 100}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Configuración de los círculos
  const circles = [
    {
      size: "w-32 h-32",
      initialPosition: { x: "25%", y: "25%" },
      animation: {
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 360],
      },
      duration: 8,
    },
    {
      size: "w-24 h-24",
      initialPosition: { x: "75%", y: "75%" },
      animation: {
        y: [0, 25, 0],
        scale: [1, 0.9, 1],
        rotate: [0, -360],
      },
      duration: 6,
    },
    {
      size: "w-16 h-16",
      initialPosition: { x: "65%", y: "35%" },
      animation: {
        y: [0, -20, 0],
        scale: [1, 1.2, 1],
        rotate: [0, 180],
      },
      duration: 4,
    },
    {
      size: "w-20 h-20",
      initialPosition: { x: "15%", y: "65%" },
      animation: {
        y: [0, 15, 0],
        scale: [1, 0.8, 1],
        rotate: [0, -180],
      },
      duration: 5,
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: `
          radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 50%
          )
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#212121]/50 to-[#2b80e0]/50 dark:from-[#0a0a0a]/50 dark:to-[#1a1a1a]/50" />

      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute ${circle.size} rounded-full bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-sm shadow-lg`}
          style={{
            left: circle.initialPosition.x,
            top: circle.initialPosition.y,
            transformOrigin: "center",
          }}
          animate={{
            ...circle.animation,
            x: mousePosition.x * 20 - 10, // Añade un ligero seguimiento al mouse
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            x: {
              duration: 0.5,
              ease: "linear",
            },
          }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
        />
      ))}
    </motion.div>
  );
};
