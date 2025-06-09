import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedWords } from "./components/AnimatedWords";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Board = () => {
  const lessonData = {
    title: "Mastering JavaScript Basics Elegantly",
    sections: [
      {
        topic: "Creative Direction",
        solution: "Make JavaScript feel intuitive, fun, and approachable.",
        subHeading: "This lesson turns code into a smooth journey.",
        icon: "💡",
      },
      {
        topic: "Step 1: What is JavaScript?",
        solution: "A programming language that adds interactivity to websites.",
        subHeading: "It powers features like dropdowns, sliders, and more.",
        explanation: "Think of it as the brain behind dynamic web pages.",
        icon: "🧠",
      },
      {
        topic: "Step 2: Your First Variable",
        solution: "Use `let`, `const`, or `var` to store data.",
        subHeading: "Start with a `let` for flexibility.",
        shortcut: "`let name = 'Alex';`",
        icon: "📦",
        code: {
          type: "single",
          correct: "let name = 'Alex';",
        },
      },
      {
        topic: "Step 3: Write a Function",
        solution: "Functions let you reuse blocks of code.",
        subHeading: "Think of them as recipes in your code.",
        explanation: "`function greet() { console.log('Hello!'); }`",
        icon: "🔁",
        code: {
          type: "single",
          correct: "function greet() {\n  console.log('Hello!');\n}",
        },
      },
      {
        topic: "Step 4: Use Conditions",
        solution: "Decide what happens based on true/false logic.",
        subHeading: "Try `if` statements to make decisions.",
        formula: "`if (isHungry) { eat(); } else { wait(); }`",
        icon: "⚖️",
        code: {
          type: "compare",
          wrong: "if isHungry {\n  eat();\n}",
          correct: "if (isHungry) {\n  eat();\n} else {\n  wait();\n}",
        },
      },
      {
        topic: "Step 5: Loops are Magic",
        solution: "Repeat tasks using `for` or `while` loops.",
        subHeading:
          "They help you avoid writing the same code again and again.",
        shortcut: "`for (let i = 0; i < 5; i++) { console.log(i); }`",
        icon: "🔄",
        code: {
          type: "single",
          correct: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
        },
      },
      {
        topic: "Final Result",
        solution: "You now know how to declare, repeat, and decide!",
        subHeading:
          "With just a few basics, you're ready to explore real apps.",
        icon: "🚀",
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
  const [visibleSections, setVisibleSections] = useState(0);

  const paperRef = useRef(null);

  const WORD_ANIMATION_DELAY = 80;
  const WORD_FADE_DURATION = 400;

  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const loopIndex = useRef(0);
  const delayRef = useRef(0);
  const secIndex = useRef(0);
  const timeStampRef = useRef(0);
  const isResetRef = useRef(false);

  let timeoutId;

  useEffect(() => {
    if (!isPlayRef.current) return;

    const revealNext = async () => {
      for (let i = loopIndex.current; i < lessonData.sections.length; i++) {
        console.log("Index", i);
        if (!isPlayRef.current) {
          loopIndex.current = i;
          break;
        }

        if (secIndex.current !== i) {
          secIndex.current = i;
          delayRef.current = 0;
        }
        const section = lessonData.sections[currentSectionIndex];

        // Updating Visible Section State
        setVisibleSections(i);
        setCurrentSectionIndex(i);
        timeStampRef.current = new Date().getTime();
        // Getting words length of all possible strings
        const topicWords = section.topic?.split(" ").length || 0;
        const solutionWords = section.solution?.split(" ").length || 0;
        const subHeadingWords = section.subHeading?.split(" ").length || 0;
        // Adding them all
        const wordCount = topicWords + solutionWords + subHeadingWords;
        if (delayRef.current === 0) {
          delayRef.current = wordCount * 80 + 2000;
        }
        // Adding promise delay
        await new Promise((res) => {
          timeoutId = setTimeout(() => {
            // Only increment if still playing
            if (i === lessonData.sections.length - 1) {
              setShowSummary(true);
            }
            if (isPlayRef.current) {
              loopIndex.current = i + 1;
              setShowTopic(false);
              setShowSolution(false);
              setShowSubHeading(false);
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

  const summaryDelayRef = useRef(0);
  const summaryTimeStampRef = useRef(0);
  const summaryLoopIndexRef = useRef(0);
  const summarySecIndexRef = useRef(0);

  let summaryTimeoutId;

  useEffect(() => {
    if (!showSummary) return;
    console.log("Show Summary", showSummary);
    const loadSummaryData = async () => {
      for (
        let i = summaryLoopIndexRef.current;
        i < lessonData.sections.length;
        i++
      ) {
        if (!isPlayRef.current) {
          summaryLoopIndexRef.current = i;
          break;
        }

        if (summarySecIndexRef.current !== i) {
          summarySecIndexRef.current = i;
          summaryDelayRef.current = 0;
        }

        summaryTimeStampRef.current = new Date().getTime();
        if (summaryDelayRef.current === 0) {
          summaryDelayRef.current = 300;
        }
        await new Promise((res) => {
          summaryTimeoutId = setTimeout(() => {
            if (isPlayRef.current) {
              setSummaryData((prev) => [
                ...prev,
                {
                  topic: lessonData.sections[i].topic,
                  solution: lessonData.sections[i].solution,
                },
              ]);
              summaryLoopIndexRef.current = i + 1;
              summaryDelayRef.current = 0;
            } else {
              summaryLoopIndexRef.current = i;
            }
            res(true);
          }, summaryDelayRef.current);
        });
        if (!isPlayRef.current) break;
      }
    };
    loadSummaryData();
    return () => {
      if (summaryTimeoutId) {
        clearTimeout(summaryTimeoutId);
        const currentTimeStamp = new Date().getTime();
        const timeStampDiff = currentTimeStamp - summaryTimeStampRef.current;
        summaryDelayRef.current = summaryDelayRef.current - timeStampDiff;
      }
    };
  }, [showSummary, isPlay]);

  // useEffect(() => {
  //   const section = lessonData.sections[currentSectionIndex];
  //   if (!section) return;

  //   const topicWords = section.topic?.split(" ").length || 0;
  //   const solutionWords = section.solution?.split(" ").length || 0;
  //   const subHeadingWords = section.subHeading?.split(" ").length || 0;

  //   const topicTime = topicWords * WORD_ANIMATION_DELAY + WORD_FADE_DURATION;
  //   const solutionTime =
  //     topicTime + solutionWords * WORD_ANIMATION_DELAY + WORD_FADE_DURATION;
  //   const subHeadingTime =
  //     solutionTime +
  //     subHeadingWords * WORD_ANIMATION_DELAY +
  //     WORD_FADE_DURATION;

  //   setShowTopic(true);

  //   const solutionTimer = setTimeout(() => setShowSolution(true), topicTime);
  //   const subHeadingTimer = setTimeout(
  //     () => setShowSubHeading(true),
  //     solutionTime
  //   );

  //   let nextSectionTimer;
  //   if (currentSectionIndex < lessonData.sections.length - 1) {
  //     nextSectionTimer = setTimeout(() => {
  //       setShowTopic(false);
  //       setShowSolution(false);
  //       setShowSubHeading(false);
  //       setCurrentSectionIndex((prev) => prev + 1);
  //     }, subHeadingTime + 1200);
  //   } else {
  //     setTimeout(() => setShowSummary(true), subHeadingTime + 1200);
  //   }
  //   if (showSummary) {
  //     const loadSummaryData = async () => {
  //       for (let i = 0; i < lessonData.sections.length; i++) {
  //         setSummaryData((prev) => [
  //           ...prev,
  //           {
  //             topic: lessonData.sections[i].topic,
  //             solution: lessonData.sections[i].solution,
  //           },
  //         ]);
  //         await new Promise((res) => setTimeout(res, 300));
  //       }
  //     };
  //     loadSummaryData();
  //   }

  //   return () => {
  //     clearTimeout(solutionTimer);
  //     clearTimeout(subHeadingTimer);
  //     if (nextSectionTimer) clearTimeout(nextSectionTimer);
  //   };
  // }, [currentSectionIndex, showSummary]);

  // useEffect(() => {
  //   if (paperRef.current) {
  //     paperRef.current.scrollTo({
  //       top: paperRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [
  //   currentSectionIndex,
  //   showTopic,
  //   showSolution,
  //   showSubHeading,
  //   showSummary,
  //   summaryData,
  // ]);

  const section = lessonData.sections[currentSectionIndex];
  if (!section) return null;

  const handleChangePlay = () => {
    setIsPlay(!isPlay);
  };

  const handleReset = () => {
    // Stop playback
    setIsPlay(false);

    // Reset all state and refs
    setVisibleSections([]);
    setCurrentSectionIndex(0);

    // Reset refs
    loopIndex.current = 0;
    secIndex.current = 0;
    timeStampRef.current = 0;
    delayRef.current = 0;
    isPlayRef.current = false;
    clearTimeout(timeoutId);
    isResetRef.current = true;
    setShowSummary(false);
    setSummaryData([]);

    summaryLoopIndexRef.current = 0;
    summarySecIndexRef.current = 0;

    // Optional: scroll to top of paperRef
    if (paperRef.current) {
      paperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      setIsPlay(true);
    }, 100);
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      if (showSummary) {
        setShowSummary(false);
      }

      setCurrentSectionIndex(currentSectionIndex - 1);
      loopIndex.current--;
      setVisibleSections(visibleSections - 1);
      secIndex.current = secIndex.current - 1;
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
    if (currentSectionIndex < lessonData.sections.length) {
      if (currentSectionIndex === lessonData.sections.length - 1) {
        setShowSummary(true);
        setShowTopic(false);
        setShowSolution(false);
        setShowSubHeading(false);
      } else {
        setCurrentSectionIndex(currentSectionIndex + 1);
        loopIndex.current++;
        setVisibleSections(visibleSections + 1);
        secIndex.current = secIndex.current + 1;
        timeStampRef.current = 0;
        delayRef.current = 0;
        isResetRef.current = true;
        isPlayRef.current = false;
        setIsPlay(!isPlay);
        setTimeout(() => {
          setIsPlay(isPlay);
        }, 10);
      }
    }
  };
  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTo({
        top: paperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [summaryData]);

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

      <div className="flex flex-col items-center justify-center overflow-y-scroll py-10">
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
          </div>
          <div
            ref={paperRef}
            className="relative w-full h-full rounded-xl bg-black overflow-hidden flex flex-col gap-3 overflow-y-scroll custom-bar py-3 px-2"
          >
            {lessonData.sections
              .map((sec, i) => ({ ...sec, i }))
              .filter((sec) => visibleSections == sec.i)
              .map((sec, i) => (
                <div
                  key={i.toString() + sec.i.toString()}
                  className="flex flex-col items-center justify-between gap-2 flex-1"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold text-center underline">
                      {lessonData.title}
                    </h3>
                    <div className="flex flex-col items-center gap-2">
                      {!showSummary && (
                        <>
                          {sec.icon && (
                            <div className="text-lg md:text-4xl">
                              {sec.icon}
                            </div>
                          )}

                          {sec.topic && (
                            <AnimatedWords
                              key={sec.i.toString() + sec.topic}
                              text={sec.topic}
                              isActive={sec.i === currentSectionIndex}
                              index={sec.i}
                              isPlay={isPlay}
                            />
                          )}

                          {sec.formula && (
                            <AnimatedWords
                              key={sec.i.toString() + sec.formula}
                              text={sec.formula}
                              isActive={sec.i === currentSectionIndex}
                              index={sec.i}
                              isPlay={isPlay}
                              className="text-pink-400 text-base mg:text-md text-center font-mono"
                              prefix="Formula:"
                            />
                          )}

                          {sec.shortcut && (
                            <AnimatedWords
                              key={sec.i.toString() + sec.shortcut}
                              text={sec.shortcut}
                              isActive={sec.i === currentSectionIndex}
                              index={sec.i}
                              isPlay={isPlay}
                              className="text-green-400 text-sm italic text-center"
                              prefix="Tip:"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {!showSummary && (
                    <div className="flex flex-col gap-2 text-center w-full px-10">
                      <AnimatedWords
                        key={sec.i.toString() + sec.solution}
                        text={sec.solution}
                        isActive={sec.i === currentSectionIndex}
                        index={sec.i}
                        isPlay={isPlay}
                        className="text-white font-bold text-2xl sm:text-4xl lg:text-5xl dm-sans"
                      />
                      <div className="mt-4">
                        {sec.code && (
                          <>
                            {sec.code.type === "compare" && (
                              <CodeComparison
                                wrong={sec.code.wrong}
                                correct={sec.code.correct}
                              />
                            )}
                            {sec.code.type === "single" && (
                              <CodeBlock code={sec.code.correct} index={0} />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {!showSummary && (
                    <div className="flex flex-col items-center gap-2">
                      {sec.subHeading && (
                        <AnimatedWords
                          key={sec.i.toString() + sec.subHeading}
                          text={sec.subHeading}
                          isActive={sec.i === currentSectionIndex}
                          index={sec.i}
                          isPlay={isPlay}
                          className="text-white text-base sm:text-lg text-center"
                        />
                      )}
                      {sec.explanation && (
                        <AnimatedWords
                          key={sec.i.toString() + sec.explanation}
                          text={sec.explanation}
                          isActive={sec.i === currentSectionIndex}
                          index={sec.i}
                          isPlay={isPlay}
                          className="text-blue-300 text-sm max-w-xl text-center"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
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
                          <p className="font-semibold text-sm">{step.topic}</p>
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
    </>
  );
};

export default Board;

const CodeBlock = ({ code, index }) => {
  return (
    <SyntaxHighlighter language="jsx" style={dracula}>
      {code}
    </SyntaxHighlighter>
  );
};

const CodeComparison = ({ wrong, correct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-red-400 font-bold mb-1">🚫 Wrong</h3>
        <CodeBlock code={wrong} index={0} />
      </div>
      <div>
        <h3 className="text-green-400 font-bold mb-1">✅ Correct</h3>
        <CodeBlock code={correct} index={1} />
      </div>
    </div>
  );
};
