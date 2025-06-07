import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Board = () => {
  const lessonData = {
    title: "Creating an Elegant Instagram Reel for Moon Care",
    sections: [
      {
        topic: "Creative Direction",
        solution: "Build a dreamy, luxurious feel with calm visuals.",
        subHeading: "Your brand embodies nighttime care and elegance.",
        icon: "🌙",
      },
      {
        topic: "Step 1: Start with a Brand Intro",
        solution: "Show the Moon Care logo under a glowing moon.",
        subHeading: "Hook users in the first 2 seconds with vibe + identity.",
        explanation: "Use soft moonlight glow, stars, or lavender tones.",
        icon: "✨",
      },
      {
        topic: "Step 2: Address the Problem",
        solution: "Present an issue like ‘Tired eyes by 10pm?’",
        subHeading: "Trigger emotion using relatable night-time skin issues.",
        shortcut: "Use large, calm text with subtle animation.",
        icon: "😴",
      },
      {
        topic: "Step 3: Share a Magical Tip",
        solution: "Recommend a simple tip (e.g., chilled green tea pads).",
        subHeading: "Educate while keeping the tone light and elegant.",
        explanation: "Show short text like: ‘✨ Moonlight Tip: Chill + Soothe’",
        icon: "🌿",
      },
      {
        topic: "Step 4: Introduce Your Product Softly",
        solution: "Showcase the Night Elixir with glow and sparkles.",
        subHeading: "Avoid pushy selling — let the vibe do the talking.",
        formula: "Visual + Calm Text = Desire to Explore Product",
        icon: "🧴",
      },
      {
        topic: "Step 5: Close with Branding",
        solution: "End with your handle, tagline, and a ‘Follow’ CTA.",
        subHeading: "Reinforce brand without shouting.",
        shortcut: "Use text like: ‘💫 Follow @mooncare for nightly glow’",
        icon: "📱",
      },
      {
        topic: "Final Result",
        solution: "A smooth, elegant 15s reel aligned with Moon Care's voice.",
        subHeading: "Dreamy visuals, a skincare tip, and soft branding.",
        icon: "✅",
      },
    ],
  };

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showTopic, setShowTopic] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSubHeading, setShowSubHeading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [summaryData, setSummaryData] = useState([]);

  const paperRef = useRef(null);

  const WORD_ANIMATION_DELAY = 80;
  const WORD_FADE_DURATION = 400;

  const animationWord = (text) =>
    text.split(" ").map((word, index) => (
      <span
        key={index}
        className="inline-block opacity-0"
        style={{
          animation: `fadeIn 0.4s ease forwards`,
          animationDelay: `${index * WORD_ANIMATION_DELAY}ms`,
        }}
      >
        {word}&nbsp;
      </span>
    ));

  useEffect(() => {
    const section = lessonData.sections[currentSectionIndex];
    if (!section) return;

    const topicWords = section.topic?.split(" ").length || 0;
    const solutionWords = section.solution?.split(" ").length || 0;
    const subHeadingWords = section.subHeading?.split(" ").length || 0;

    const topicTime = topicWords * WORD_ANIMATION_DELAY + WORD_FADE_DURATION;
    const solutionTime =
      topicTime + solutionWords * WORD_ANIMATION_DELAY + WORD_FADE_DURATION;
    const subHeadingTime =
      solutionTime +
      subHeadingWords * WORD_ANIMATION_DELAY +
      WORD_FADE_DURATION;

    setShowTopic(true);

    const solutionTimer = setTimeout(() => setShowSolution(true), topicTime);
    const subHeadingTimer = setTimeout(
      () => setShowSubHeading(true),
      solutionTime
    );

    let nextSectionTimer;
    if (currentSectionIndex < lessonData.sections.length - 1) {
      nextSectionTimer = setTimeout(() => {
        setShowTopic(false);
        setShowSolution(false);
        setShowSubHeading(false);
        setCurrentSectionIndex((prev) => prev + 1);
      }, subHeadingTime + 1200);
    } else {
      setTimeout(() => setShowSummary(true), subHeadingTime + 1200);
    }
    if (showSummary) {
      const loadSummaryData = async () => {
        for (let i = 0; i < lessonData.sections.length; i++) {
          setSummaryData((prev) => [
            ...prev,
            {
              topic: lessonData.sections[i].topic,
              solution: lessonData.sections[i].solution,
            },
          ]);
          await new Promise((res) => setTimeout(res, 300));
        }
      };
      loadSummaryData();
    }

    return () => {
      clearTimeout(solutionTimer);
      clearTimeout(subHeadingTimer);
      if (nextSectionTimer) clearTimeout(nextSectionTimer);
    };
  }, [currentSectionIndex, showSummary]);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTo({
        top: paperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [
    currentSectionIndex,
    showTopic,
    showSolution,
    showSubHeading,
    showSummary,
    summaryData,
  ]);

  const section = lessonData.sections[currentSectionIndex];
  if (!section) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <section className="w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/90 overflow-hidden">
        <div className="border-r border-gray-500 "></div>
        <div className="flex flex-col items-center justify-center overflow-y-scroll py-10 ">
          <div className="flex flex-col gap-2 w-[80%] h-[600px]">
            <div className="flex items-center justify-start w-full gap-4">
              <div
                // onClick={handleChangePlay}
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
              className="relative w-full h-full rounded-xl bg-black overflow-hidden flex flex-col gap-3 overflow-y-scroll custom-bar py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-white text-xl font-semibold text-center underline">
                  {lessonData.title}
                </h3>
                <div className="flex flex-col items-center gap-2">
                  {!showSummary && (
                    <>
                      {section.icon && (
                        <div className="text-4xl">{section.icon}</div>
                      )}

                      {showTopic && section.topic && (
                        <h2 className="text-white text-lg">
                          {animationWord(section.topic)}
                        </h2>
                      )}

                      {section.formula && (
                        <p className="text-pink-400 text-md text-center font-mono">
                          Formula: {animationWord(section.formula)}
                        </p>
                      )}

                      {section.shortcut && (
                        <p className="text-green-400 text-sm italic text-center">
                          Tip: {animationWord(section.shortcut)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {!showSummary && showSolution && section.solution && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 text-center w-full px-10">
                  <h1 className="text-white font-bold text-5xl dm-sans">
                    {animationWord(section.solution)}
                  </h1>
                </div>
              )}

              {!showSummary && showSubHeading && (
                <div className="mt-auto flex flex-col items-center gap-2">
                  {section.subHeading && (
                    <h2 className="text-white text-lg text-center">
                      {animationWord(section.subHeading)}
                    </h2>
                  )}
                  {section.explanation && (
                    <p className="text-blue-300 text-sm max-w-xl text-center">
                      {animationWord(section.explanation)}
                    </p>
                  )}
                </div>
              )}
              {/* ✅ Summary Step Flow */}
              {showSummary && (
                <div className="flex flex-col items-center gap-6 px-4 py-6">
                  <h2 className="text-white text-2xl font-bold text-center">
                    🎉 Summary Flow
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {summaryData.map((step, index) => {
                      const sectionIcon = lessonData.sections[index].icon;

                      return (
                        <React.Fragment key={step.topic + step.solution}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`relative rounded-xl p-4 w-64 shadow-xl flex flex-col items-center text-center transition-all duration-500
                ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-pink-100 to-pink-200"
                    : "bg-gradient-to-br from-blue-100 to-blue-200"
                }`}
                          >
                            <div className="absolute -top-4 -left-4 bg-black text-white text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                              {index + 1}
                            </div>
                            {sectionIcon && (
                              <div className="text-3xl mb-2">{sectionIcon}</div>
                            )}
                            <p className="font-semibold text-sm">
                              {step.topic}
                            </p>
                            <p className="text-sm mt-1 text-gray-700">
                              {step.solution}
                            </p>
                          </motion.div>

                          {index < summaryData.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                                delay: index * 0.1,
                              }}
                              className="text-white text-2xl"
                            >
                              ➡️
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {/* ✅ Final Check */}
                    {/* <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: summaryData.length * 0.1 }}
                      className="rounded-xl p-4 w-64 shadow-xl flex flex-col items-center justify-center text-center bg-green-200 text-green-900 font-bold"
                    >
                      ✅ Complete!
                    </motion.div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
