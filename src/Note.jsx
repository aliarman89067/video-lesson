import { useEffect, useMemo, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { motion } from "framer-motion";
import { AnimatedWords } from "./components/AnimatedWords";
import { useIsMobile } from "./hooks/use-mobile";

export default function LessonDisplay() {
  const lessonData = {
    title: "🎨 Dive Into 2D Animation - Frame by Frame Magic",
    sections: [
      {
        side: "left",
        heading: "What is 2D Animation?",
        description:
          "2D animation is the art of making drawings move. It’s like breathing life into still images using time, motion, and a bit of storytelling magic.",
        dialogue:
          "If you've ever flipped through a sticky note pad to make a stickman dance — congratulations, you’ve done 2D animation!",
        imageKeyword: "hand-drawn animation flipbook",
      },
      {
        side: "right",
        heading: "The Power of Frames",
        description:
          "Animations are built frame by frame. The more frames you draw, the smoother your motion looks — but more frames also mean more work. Animators often use 12 or 24 frames per second (FPS) depending on the style.",
        dialogue:
          "Think of each frame like a musical note. One might not impress, but a sequence? That’s rhythm, that’s movement!",
        imageKeyword: "frame sequence of a bouncing ball",
      },
      {
        side: "left",
        heading: "Timing and Spacing",
        description:
          "Timing is how long an action takes. Spacing is how far apart the drawings are. Close drawings mean slow motion. Wide apart? Fast movement. Mastering these creates believable motion.",
        dialogue:
          "Timing gives animation its soul. It’s not just movement — it’s how that movement *feels*.",
        imageKeyword: "animation timing spacing chart",
      },
      {
        side: "right",
        heading: "Keyframes and Inbetweens",
        description:
          "Keyframes are your main poses. Inbetweens fill the space between them. You can start by drawing just the keyframes to plan your motion, then add inbetweens for smoothness.",
        dialogue:
          "It’s like storytelling — show the beginning, middle, and end first. The details come later.",
        imageKeyword: "keyframe and inbetween example",
      },
      {
        side: "left",
        heading: "Simple Practice: Bouncing Ball",
        description:
          "Start simple. Draw a ball bouncing. Focus on gravity, squash & stretch, and spacing. This exercise teaches the core of motion physics and timing.",
        dialogue:
          "Even Pixar animators start with a bouncing ball. Master this, and you’re on your way!",
        imageKeyword: "bouncing ball animation sequence",
      },
      {
        side: "right",
        heading: "Tools of the Trade",
        description:
          "You can animate with pencil and paper, or use digital tools like Krita, RoughAnimator, or Adobe Animate. Start with what’s accessible and upgrade as you grow.",
        dialogue:
          "It's not about the tools — it’s about your passion. Even a free app can bring your characters to life.",
        // No image needed — tools can vary widely
      },
      {
        side: "left",
        heading: "Bring a Character to Life",
        description:
          "Try animating a simple character wave or walk. Focus on consistent shapes, natural motion, and personality. Even a blob can have charm if it moves with intention!",
        dialogue:
          "A wave isn’t just a hand going side to side — it’s emotion, timing, and rhythm all in one gesture.",
        imageKeyword: "simple animated character waving",
      },
      {
        side: "right",
        heading: "Final Thoughts",
        description:
          "2D animation is about patience, practice, and play. Don’t aim for perfect — aim for expressive. Tell a story with every frame you draw.",
        dialogue:
          "You don’t need to be a master to start. You just need to start to become one.",
        // No image — ending message is strong in words
      },
    ],
  };

  const paperRef = useRef(null);
  const [dotsCount, setDotsCount] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [images, setImages] = useState({});
  const [isPlay, setIsPlay] = useState(true);
  const [visibleImages, setVisibleImages] = useState([]);

  const { speak: startSpeak } = useSpeechSynthesis();
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const loopIndex = useRef(0);

  const secIndex = useRef(0);
  const timeStampRef = useRef(0);
  const delayRef = useRef(0);

  const isResetRef = useRef(false);

  let timeoutId;
  useEffect(() => {
    if (!isPlayRef.current) return;

    const revealNext = async () => {
      for (let i = loopIndex.current; i < lessonData.sections.length; i++) {
        if (!isPlayRef.current) {
          loopIndex.current = i;
          break;
        }
        if (secIndex.current !== i) {
          secIndex.current = i;
          delayRef.current = 0;
        }

        timeStampRef.current = new Date().getTime();

        const sec = lessonData.sections[i];
        setVisibleSections((prev) => {
          if (prev.includes(i)) return prev;
          return [...prev, i];
        });
        setCurrentIndex(i);

        const wordCount =
          (sec.description?.split(" ").length || 0) +
          (sec.subheading?.split(" ").length || 0);
        if (delayRef.current === 0) {
          delayRef.current = wordCount * 80 + 800;
        }
        await new Promise((res) => {
          timeoutId = setTimeout(() => {
            // Only increment if still playing
            if (isPlayRef.current) {
              loopIndex.current = i + 1;
            } else {
              loopIndex.current = i;
            }
            res(true);
          }, delayRef.current);
        });

        if (!isPlayRef.current) break;
      }
    };

    revealNext();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        const currentTimeStamp = new Date().getTime();
        const timeStampDiff = currentTimeStamp - timeStampRef.current;
        if (!isResetRef.current) {
          delayRef.current = delayRef.current - timeStampDiff;
        } else {
          isResetRef.current = false;
          timeStampRef.current = new Date().getTime();
        }
      }
    };
  }, [isPlay]);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTo({
        top: paperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleSections]);

  const handleChangePlay = () => {
    setIsPlay(!isPlay);
  };
  const handleReset = () => {
    // Stop playback
    setIsPlay(false);

    // Reset all state and refs
    setVisibleSections([]);
    setVisibleImages([]);
    setCurrentIndex(0);

    // Reset refs
    loopIndex.current = 0;
    secIndex.current = 0;
    timeStampRef.current = 0;
    delayRef.current = 0;
    isPlayRef.current = false;
    clearTimeout(timeoutId);
    isResetRef.current = true;

    // Optional: scroll to top of paperRef
    if (paperRef.current) {
      paperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      setIsPlay(true);
    }, 100);
  };

  const dotLength = useMemo(() => {
    return Array.from({ length: dotsCount }).map((_) =>
      Math.random() < 0.5 ? "14px" : "16px"
    );
  }, [dotsCount]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      if (visibleSections.length === lessonData.sections.length) {
        loopIndex.current = loopIndex.current - 2;
      } else {
        loopIndex.current = loopIndex.current - 1;
      }

      setVisibleSections((prevVisibleSections) => {
        const updated = [...prevVisibleSections];
        const targetIndex = updated.splice(0, updated.length - 2);

        if (updated.length === 1) {
          return [];
        } else {
          return targetIndex;
        }
      });

      secIndex.current--;
      timeStampRef.current = 0;
      delayRef.current = 0;
      isResetRef.current = true;
      isPlayRef.current = false;
      setIsPlay(!isPlay);

      setTimeout(() => {
        setIsPlay(isPlay);
      }, 10);
    }
  };

  const handleNext = () => {
    if (currentIndex < lessonData.sections.length) {
      setCurrentIndex((prev) => prev + 1);

      loopIndex.current++;

      setVisibleSections((prevVisibleSections) => {
        const updated = [...prevVisibleSections];
        const targetIndex = updated.splice(0, updated.length + 1);

        return targetIndex;
      });

      secIndex.current++;
      timeStampRef.current = 0;
      delayRef.current = 0;
      isResetRef.current = true;
      isPlayRef.current = false;
      setIsPlay(!isPlay);

      setVisibleImages((prev) => [...prev, currentIndex]);

      setTimeout(() => {
        setIsPlay(isPlay);
      }, 10);
    }
  };

  const isMobile = useIsMobile();
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
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 w-[90%] md:w-[80%] lg:w-[800px] xl:w-[950px] h-[600px]">
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
            <div
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center cursor-pointer"
            >
              Prev
            </div>
            <div
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center cursor-pointer"
            >
              Next
            </div>
            <div
              onClick={handleReset}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer"
            >
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </div>
          </div>
          <div
            ref={paperRef}
            className="relative w-full h-full rounded-xl bg-[#f8edeb] overflow-hidden flex gap-3 overflow-y-scroll custom-bar"
          >
            {/* Dots */}
            <div className="sticky flex flex-col gap-2 px-1 py-3 top-0 max-md:hidden">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-black/90 rounded-full"
                  style={{
                    width: dotLength[i],
                    height: dotLength[i],
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 py-3 md:pr-3 max-md:px-3">
              {/* Title */}
              <div className="flex gap-2 mb-4">
                <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#212529] md:whitespace-nowrap font-serif">
                  {lessonData.title}
                </h2>
                <div
                  className="h-3 bg-pink-200 mt-2 max-md:hidden"
                  style={{
                    animation: "growWidth 1s ease-in-out forwards",
                    width: "100%",
                  }}
                />
              </div>
              {/* TODO: Make it Cleaner letter */}
              {!isMobile && (
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
                                  <h2 className="text-base md:text-lg lg:text-xl font-medium text-[#212529] whitespace-nowrap font-serif">
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
                                <p className="text-base md:text-md font-semibold text-[#6c757d] italic">
                                  {sec.subheading}
                                </p>
                              )}
                              {sec.description && (
                                // <p className="text-md font-semibold text-[#6c757d]">
                                //   {sec.description}
                                // </p>
                                <AnimatedWords
                                  key={sec.i.toString() + sec.description}
                                  index={sec.i.toString() + sec.description}
                                  text={sec.description}
                                  isActive={sec.i === currentIndex}
                                  isPlay={isPlay}
                                  // isReset={isReset}
                                  className="text-[#495057] text-sm sm:text-base"
                                  onComplete={() =>
                                    setVisibleImages((prev) => [...prev, sec.i])
                                  }
                                />
                              )}

                              {/* Show image if exists */}
                              {images[sec.i] &&
                                visibleImages.includes(sec.i) && (
                                  <motion.img
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "linear",
                                    }}
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
              )}
              {isMobile && (
                <div className="grid grid-cols-1 gap-8 pb-3">
                  <div className="flex flex-col gap-6">
                    {lessonData.sections
                      .map((sec, i) => ({ ...sec, i }))
                      .filter((sec) => visibleSections.includes(sec.i))
                      .map((sec) => {
                        return (
                          <div
                            key={sec.i}
                            className="flex flex-col gap-2 items-start"
                            style={{ position: "relative" }}
                          >
                            {(sec.heading || sec.subheading) && (
                              <div className="flex items-center gap-2">
                                <h2 className="text-base md:text-lg lg:text-xl font-medium text-[#212529] whitespace-nowrap font-serif">
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
                              <p className="text-base md:text-md font-semibold text-[#6c757d] italic">
                                {sec.subheading}
                              </p>
                            )}
                            {sec.description && (
                              // <p className="text-md font-semibold text-[#6c757d]">
                              //   {sec.description}
                              // </p>
                              <AnimatedWords
                                key={sec.i.toString() + sec.description}
                                index={sec.i.toString() + sec.description}
                                text={sec.description}
                                isActive={sec.i === currentIndex}
                                isPlay={isPlay}
                                // isReset={isReset}
                                className="text-[#495057] text-sm sm:text-base"
                                onComplete={() =>
                                  setVisibleImages((prev) => [...prev, sec.i])
                                }
                              />
                            )}

                            {/* Show image if exists */}
                            {images[sec.i] && visibleImages.includes(sec.i) && (
                              <motion.img
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "linear",
                                }}
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
