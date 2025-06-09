import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export function AnimatedWords({
  text,
  isActive,
  index,
  isPlay,
  onComplete,
  className,
  prefix,
}) {
  const currentWordRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    let intervalId;
    if (isPlay) {
      intervalId = setInterval(() => {
        currentWordRef.current += 1;
        if (currentWordRef.current >= words.length) {
          onComplete?.();
          clearInterval(intervalId);
        }
      }, 80);
    }
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlay]);

  useEffect(() => {
    if (!isPlay) {
      setCurrentIndex(currentWordRef.current);
    }
  }, [isPlay]);

  // useEffect(() => {
  //   console.log(currentWordRef.current);
  // }, [currentIndex]);

  const animated = useMemo(() => {
    if (!isActive) {
      return text.split(" ").map((word, i) => `${word} `);
    }

    if (!isPlay) {
      return text
        .split(" ")
        .slice(0, currentIndex)
        .map((word, i) => (
          <span
            key={word + i.toString() + index.toString()}
            className="inline-block"
          >
            {word}&nbsp;
          </span>
        ));
    }

    const prevDescArr = text
      .split(" ")
      .slice(0, currentIndex)
      .map((word, i) => (
        <span
          key={word + i.toString() + index.toString()}
          className="inline-block leading-relaxed"
        >
          {word}&nbsp;
        </span>
      ));

    const nextDescArr = text
      .split(" ")
      .slice(currentIndex, text.length)
      .map((word, i) => (
        <motion.span
          key={word + i.toString() + index.toString()}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          layout="position"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
          className="inline-block opacity-0 leading-relaxed"
        >
          {word}&nbsp;
        </motion.span>
      ));
    return [...prevDescArr, ...nextDescArr];
  }, [text, isActive, isPlay, currentIndex]);

  return (
    <p
      className={cn(
        "text-base font-medium text-white leading-relaxed font-sans",
        className
      )}
    >
      {prefix} {animated}
    </p>
  );
}
