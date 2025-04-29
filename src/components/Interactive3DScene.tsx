"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface Interactive3DSceneProps {
  className?: string;
}

export const Interactive3DScene = ({ className = "" }: Interactive3DSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
      color: "from-white/5 to-white/20"
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
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#212121]/10 to-[#2b80e0]/10 dark:from-[#0a0a0a]/10 dark:to-[#1a1a1a]/10" />

      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute ${circle.size} rounded-full bg-gradient-to-br ${circle.color} backdrop-blur-sm shadow-lg`}
          style={{
            left: circle.initialPosition.x,
            top: circle.initialPosition.y,
            transformOrigin: "center",
          }}
          animate={circle.animation}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
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
