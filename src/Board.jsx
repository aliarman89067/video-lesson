import React, { useEffect, useState } from "react";

const Board = () => {
  const lessonData = {
    title: "Designing a Simple Mobile App UI (UI/UX Principles)",
    sections: [
      {
        topic: "Design Task",
        solution: "Design a login screen for a mobile app.",
        subHeading: "We'll use core UI/UX principles to guide each step.",
        icon: "🎨",
      },
      {
        topic: "Step 1: Understand the User Goal",
        solution: "User wants to log in quickly and securely.",
        subHeading: "Start with user intent before designing any element.",
        explanation: "Empathizing with the user helps drive focused layouts.",
      },
      {
        topic: "Step 2: Structure the Layout",
        solution: "Use a vertical stack: Logo ➝ Fields ➝ Button",
        subHeading: "Prioritize clarity and a natural reading flow.",
        formula: "Top ➝ Middle ➝ Bottom (Visual hierarchy)",
        icon: "📐",
      },
      {
        topic: "Step 3: Choose Appropriate Input Fields",
        solution: "Add Email and Password fields with clear labels.",
        subHeading: "Avoid ambiguity with placeholder-only fields.",
        shortcut: "Use label + input, not just placeholder text.",
      },
      {
        topic: "Step 4: Add a Call-to-Action Button",
        solution: "Use a high-contrast 'Login' button",
        subHeading: "Make the CTA visually prominent and accessible.",
        explanation: "Buttons should have enough padding and color contrast.",
        icon: "🔘",
      },
      {
        topic: "Step 5: Improve Accessibility",
        solution: "Use readable fonts and test color contrast",
        subHeading: "Ensure all users can access the content comfortably.",
        shortcut: "WCAG contrast ratio ≥ 4.5:1 for body text",
      },
      {
        topic: "Final Result",
        solution: "Clean, functional login screen with good UX",
        subHeading: "User can log in quickly with minimal friction.",
        icon: "✅",
      },
    ],
  };

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showTopic, setShowTopic] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSubHeading, setShowSubHeading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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
      // Last section reached — show summary
      setTimeout(() => setShowSummary(true), subHeadingTime + 1200);
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

      <section className="w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/90 overflow-hidden">
        <div className="border-r border-gray-500 "></div>
        <div className="flex flex-col items-center justify-center overflow-y-scroll py-10 ">
          <div className="relative w-[80%] min-h-[600px] rounded-xl bg-black overflow-hidden flex flex-col gap-4 p-5 overflow-y-scroll custom-bar">
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
                <h2 className="text-white text-xl font-bold text-center">
                  Summary Flow
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {lessonData.sections.map((step, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`rounded-xl p-4 w-64 shadow-md flex flex-col items-center justify-center text-center animate-fade-in transition-all duration-500 bg-white`}
                        style={{
                          animationDelay: `${index * 300}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <p className="font-semibold text-sm">{step.topic}</p>
                        <p className="text-sm mt-1">{step.solution}</p>
                      </div>

                      {index !== lessonData.sections.length - 1 && (
                        <div className="text-white text-2xl">➡️</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
