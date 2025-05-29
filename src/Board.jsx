import React, { useEffect, useState } from "react";

const Board = () => {
  const lessonData = {
    title: "Solving Quadratic Equation by Factorization",
    sections: [
      {
        topic: "Question",
        solution: "Solve: x² - 5x + 6 = 0",
        subHeading: "We will solve this by factorization method.",
        icon: "🧠",
      },
      {
        topic: "Step 1: Identify coefficients",
        solution: "a = 1, b = -5, c = 6",
        subHeading: "We compare it with ax² + bx + c = 0",
        formula: "x² + bx + c = 0",
        explanation: "Identify a, b, c from the given equation.",
      },
      {
        topic: "Step 2: Find two numbers that multiply to 'ac' and add to 'b'",
        solution: "Find numbers that multiply to 6 and add to -5",
        subHeading: "Numbers are -2 and -3",
        shortcut: "Product = a×c = 6, Sum = b = -5",
        icon: "🔍",
      },
      {
        topic: "Step 3: Break middle term using those numbers",
        solution: "x² - 2x - 3x + 6 = 0",
        subHeading: "We rewrite -5x as -2x -3x",
      },
      {
        topic: "Step 4: Factor by grouping",
        solution: "(x - 2)(x - 3) = 0",
        subHeading: "Group and factor common terms",
        formula: "ax + ay = a(x + y)",
      },
      {
        topic: "Step 5: Solve each factor",
        solution: "x - 2 = 0 or x - 3 = 0",
        subHeading: "Now solve for x",
      },
      {
        topic: "Final Answer",
        solution: "x = 2 or x = 3",
        subHeading: "These are the two solutions",
        icon: "✅",
      },
    ],
  };

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showTopic, setShowTopic] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSubHeading, setShowSubHeading] = useState(false);

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
    }

    return () => {
      clearTimeout(solutionTimer);
      clearTimeout(subHeadingTimer);
      if (nextSectionTimer) clearTimeout(nextSectionTimer);
    };
  }, [currentSectionIndex]);

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

      <section className="w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/90">
        <div className="border-r border-gray-500"></div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[80%] h-[90%] rounded-xl bg-black overflow-hidden flex flex-col gap-4 p-5">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-white text-xl font-semibold text-center underline">
                {lessonData.title}
              </h3>

              {section.icon && <div className="text-4xl">{section.icon}</div>}

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
            </div>

            {showSolution && section.solution && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 text-center">
                <h1 className="text-white font-bold text-6xl dm-sans">
                  {animationWord(section.solution)}
                </h1>
              </div>
            )}

            {showSubHeading && (
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
