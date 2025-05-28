import { useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function LessonDisplay() {
  const lessonData = {
    title: "🧮 Distributive Property",
    sections: [
      {
        side: "left",
        heading: "Step 1",
        description: "We are given the expression: 34 × 58 + 34 × 9.",
        dialogue:
          "We are given 34 times 58 plus 34 times 9. Notice the common factor?",
      },
      {
        side: "left",
        heading: "Step 2",
        description: "We can factor out the common 34: 34 × (58 + 9).",
        dialogue:
          "We can factor out the common 34. It becomes 34 times the sum of 58 and 9.",
      },
      {
        side: "right",
        heading: "Step 3",
        description: "Now calculate inside the brackets: 58 + 9 = 67.",
        dialogue: "Add 58 and 9 to get 67.",
      },
      {
        side: "right",
        heading: "Step 4",
        description: "Finally, multiply: 34 × 67 = 2278.",
        dialogue: "Now multiply 34 by 67. The answer is 2278.",
      },
    ],
  };

  const paperRef = useRef(null);
  const [dotsCount, setDotsCount] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);

  const { speak: startSpeak } = useSpeechSynthesis();

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

  const animateWords = (text) =>
    text.split(" ").map((word, index) => (
      <span
        key={index}
        className="inline-block opacity-0"
        style={{
          animation: `fadeIn 0.4s ease forwards`,
          animationDelay: `${index * 80}ms`,
        }}
      >
        {word}&nbsp;
      </span>
    ));

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
      <section className="w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/95">
        <div className="border-r border-gray-500"></div>
        <div className="flex flex-col items-center justify-center">
          <div
            ref={paperRef}
            className="w-[80%] h-[80%] rounded-xl bg-[#f8edeb] overflow-hidden flex gap-3"
          >
            {/* Dots */}
            <div className="flex flex-col gap-2 px-1 py-3">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-black/95 rounded-full"
                  style={{
                    width: `${Math.random() < 0.5 ? 14 : 16}px`,
                    height: `${Math.random() < 0.5 ? 14 : 16}px`,
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

              <div className="grid grid-cols-2 gap-8">
                {["left", "right"].map((side) => (
                  <div key={side} className="flex flex-col gap-6">
                    {lessonData.sections
                      .map((sec, i) => ({ ...sec, i }))
                      .filter(
                        (sec) =>
                          sec.side === side && visibleSections.includes(sec.i)
                      )
                      .map((sec, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
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
                            <p className="text-base font-medium text-[#495057] leading-relaxed font-sans">
                              {animateWords(sec.description)}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
