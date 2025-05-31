import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export function AnimatedWords({ description, isActive, index, isPlay }) {
  useEffect(() => {
    let intervalId;

    if (isPlay) {
      intervalId = setInterval(() => {
        console.log("Hello World");
      }, 200);
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlay]);

  const animated = useMemo(() => {
    if (!isActive) return description.split(" ").map((word, i) => `${word} `);

    return description.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: i * 0.08,
        }}
        className="inline-block opacity-0"
      >
        {word}&nbsp;
      </motion.span>
    ));
  }, [description, isActive, isPlay]);

  return (
    <p className="text-base font-medium text-[#495057] leading-relaxed font-sans">
      {animated}
    </p>
  );
}
