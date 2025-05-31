import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { motion } from "framer-motion";
import { AnimatedWords } from "./components/AnimatedWords";

export default function LessonDisplay() {
  const lessonData = {
    title: "🌱 Mastering Recursion - The Jim Rohn Way",
    sections: [
      {
        side: "left",
        heading: "What is Recursion?",
        description:
          "Recursion is a powerful way of solving problems by breaking them down into smaller, similar problems. It's like climbing a staircase step by step — each step takes you closer to the top.",
        dialogue:
          "Think of recursion as the art of repeating yourself, but with purpose — moving forward one step at a time.",
        imageKeyword: "staircase",
      },
      {
        side: "right",
        heading: "Why Use Recursion?",
        description:
          "When a problem is too big or complex, recursion helps you handle it by focusing on a smaller piece. Like Jim Rohn said, 'Success is neither magical nor mysterious. Success is the natural consequence of consistently applying basic fundamentals.'",
        dialogue:
          "Recursion teaches us the power of simple, repeated action — the fundamentals that lead to success.",
        imageKeyword: "success",
      },
      {
        side: "left",
        heading: "How Does It Work?",
        description:
          "A recursive method calls itself with simpler inputs until it reaches the base case, where the solution is straightforward. Imagine dropping a pebble into a pond — the ripples spread out, each smaller than the last.",
        dialogue:
          "The key is to know when to stop — the base case is your anchor in the storm.",
      },
      {
        side: "right",
        heading: "Simple Example",
        description:
          "Consider the classic example: factorial calculation. To find the factorial of 5, you multiply 5 by the factorial of 4, which multiplies 4 by the factorial of 3, and so on, until you reach 1.",
        dialogue:
          "Each step depends on the previous — a chain of commitment leading to your goal.",
        imageKeyword: "chain",
      },
      {
        side: "left",
        heading: "Remember This",
        description:
          "Recursion is a metaphor for life — small consistent steps, repeated with purpose, build the pathway to greatness.",
        dialogue:
          "As Jim Rohn said, 'Don't wish it were easier, wish you were better.' Recursion demands patience and practice, but rewards growth.",
      },
    ],
  };

  const paperRef = useRef(null);
  const [dotsCount, setDotsCount] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [images, setImages] = useState({});
  const [isPlay, setIsPlay] = useState(true);

  const { speak: startSpeak } = useSpeechSynthesis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = useMemo(() => {
    return lessonData.sections
      .filter((sec) => sec.description)
      .map((item) => item.description);
  }, [lessonData]);

  // Fetch image from Pexels by keyword, per section
  useEffect(() => {
    async function fetchImages() {
      const newImages = {};
      for (let i = 0; i < lessonData.sections.length; i++) {
        const section = lessonData.sections[i];
        if (section.imageKeyword) {
          try {
            const res = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                section.imageKeyword
              )}&per_page=1`,
              {
                headers: {
                  Authorization:
                    "gz8rjS47EELDnyhiVGJ7zprnPMyZIdSdEMAiRgZFfrthBOUWb21qGp7A",
                },
              }
            );
            const data = await res.json();
            if (data.photos && data.photos.length > 0) {
              // You can choose which size: original, large, medium, small
              newImages[i] = data.photos[0].src.medium;
            }
          } catch (err) {
            console.error("Pexels image fetch error:", err);
          }
        }
      }
      setImages(newImages);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (paperRef.current) {
      const { height } = paperRef.current.getBoundingClientRect();
      setDotsCount(Math.floor(height / 24));
    }
  }, []);

  const speak = (text) => {
    startSpeak({ text });
  };

  useEffect(() => {
    const revealNext = async () => {
      for (let i = 0; i < lessonData.sections.length; i++) {
        const sec = lessonData.sections[i];
        setVisibleSections((prev) => [...prev, i]);
        setCurrentIndex(i);
        if (sec.dialogue) speak(sec.dialogue);

        const wordCount =
          (sec.description?.split(" ").length || 0) +
          (sec.subheading?.split(" ").length || 0);
        const delay = wordCount * 80 + 800;
        await new Promise((res) => setTimeout(res, delay));
      }
    };
    revealNext();
  }, []);

  // const currentIndex = useRef(0);
  // const currentWordsCount = useRef(0);

  // useEffect(() => {
  //   if (!isPlay || !wordCountReady) return;
  //   let intervalId;
  //   const handleWordInterval = () => {
  //     intervalId = setInterval(() => {
  //       currentWordsCount.current += 1;
  //     }, 80);
  //   };
  //   handleWordInterval();
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isPlay, wordCountReady]);
  const animateWords = useMemo(() => {
    const words = currentText[currentIndex].split(" ");
    return words.map((word, index) => {
      return (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: index * 0.08,
          }}
          className="inline-block opacity-0"
        >
          {word}&nbsp;
        </motion.span>
      );
    });
  }, [currentIndex]);

  const handleChangePlay = () => {
    setIsPlay(!isPlay);
  };

  const dotLength = useMemo(() => {
    return Array.from({ length: dotsCount }).map((_) =>
      Math.random() < 0.5 ? "14px" : "16px"
    );
  }, [dotsCount]);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes growWidth {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
      <section className="relative w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/90">
        <div className="border-r border-gray-500"></div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 w-[80%] h-[600px]">
            <div className="flex items-center justify-start w-full gap-4">
              <div
                onClick={handleChangePlay}
                className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer"
              >
                {isPlay ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div
              ref={paperRef}
              className="relative w-full h-full rounded-xl bg-[#f8edeb] overflow-hidden flex gap-3 overflow-y-scroll custom-bar"
            >
              {/* Dots */}
              <div className="sticky flex flex-col gap-2 px-1 py-3 top-0">
                {Array.from({ length: dotsCount }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-black/95 rounded-full"
                    style={{
                      width: dotLength[i],
                      height: dotLength[i],
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 py-3 pr-3">
                {/* Title */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-2xl font-semibold text-[#212529] whitespace-nowrap font-serif">
                    {lessonData.title}
                  </h2>
                  <div
                    className="h-3 bg-pink-200"
                    style={{
                      animation: "growWidth 1s ease-in-out forwards",
                      width: "100%",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 pb-3">
                  {["left", "right"].map((side) => (
                    <div key={side} className="flex flex-col gap-6">
                      {lessonData.sections
                        .map((sec, i) => ({ ...sec, i }))
                        .filter(
                          (sec) =>
                            sec.side === side && visibleSections.includes(sec.i)
                        )
                        .map((sec) => {
                          return (
                            <div
                              key={sec.i}
                              className="flex flex-col gap-2 items-start"
                              style={{ position: "relative" }}
                            >
                              {(sec.heading || sec.subheading) && (
                                <div className="flex items-center gap-2">
                                  <h2 className="text-xl font-medium text-[#212529] whitespace-nowrap font-serif">
                                    {sec.heading}
                                  </h2>
                                  <div
                                    className="h-2 bg-pink-200"
                                    style={{
                                      animation:
                                        "growWidth 1s ease-in-out forwards",
                                      width: "100%",
                                    }}
                                  />
                                </div>
                              )}
                              {sec.subheading && (
                                <p className="text-md font-semibold text-[#6c757d] italic">
                                  {sec.subheading}
                                </p>
                              )}
                              {sec.description && (
                                <AnimatedWords
                                  key={sec.i}
                                  index={sec.i}
                                  description={sec.description}
                                  isActive={sec.i === currentIndex}
                                  isPlay={isPlay}
                                />
                              )}

                              {/* Show image if exists */}
                              {images[sec.i] && (
                                <img
                                  src={images[sec.i]}
                                  alt={sec.imageKeyword || "lesson image"}
                                  width={150}
                                  height={100}
                                  style={{
                                    marginTop: 8,
                                    borderRadius: 8,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
