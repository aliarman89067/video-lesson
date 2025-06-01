import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedWords({
  description,
  isActive,
  index,
  isPlay,
  onComplete,
}) {
  const currentWordRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = useMemo(() => description.split(" "), [description]);

  useEffect(() => {
    let intervalId;
    if (isPlay) {
      intervalId = setInterval(() => {
        currentWordRef.current += 1;
        if (currentWordRef.current >= words.length) {
          onComplete();
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
    if (!isActive) return description.split(" ").map((word, i) => `${word} `);

    if (!isPlay) {
      return description
        .split(" ")
        .slice(0, currentIndex)
        .map((word, i) => (
          <span key={`${i + currentIndex}-${word}`} className="inline-block">
            {word}&nbsp;
          </span>
        ));
    }

    const prevDescArr = description
      .split(" ")
      .slice(0, currentIndex)
      .map((word, i) => (
        <span
          key={`${i + currentIndex}-${word}`}
          className="inline-block leading-relaxed"
        >
          {word}&nbsp;
        </span>
      ));

    const nextDescArr = description
      .split(" ")
      .slice(currentIndex, description.length)
      .map((word, i) => (
        <motion.span
          key={`${i + currentIndex}-${word}`}
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
  }, [description, isActive, isPlay, currentIndex]);

  return (
    <p className="text-base font-medium text-[#495057] leading-relaxed font-sans">
      {animated}
    </p>
  );
}
