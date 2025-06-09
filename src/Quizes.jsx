import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "./utils";

const lessonData = {
  title: "How Kids Should Cross the Road Safely",
  sections: [
    {
      heading: "🚦 Stop, Look, Listen, Think!",
      subHeading: "The 4 golden rules before crossing the road",
      imageKeyword: "kid crossing road safely",
      content: (
        <div className="text-sm space-y-2">
          <p>
            ✅ <strong>Stop:</strong> Stand still on the pavement edge.
          </p>
          <p>
            👀 <strong>Look:</strong> Look both ways – left, right, and again
            left.
          </p>
          <p>
            👂 <strong>Listen:</strong> Can you hear cars or bikes coming?
          </p>
          <p>
            🧠 <strong>Think:</strong> Is it safe now to cross?
          </p>
        </div>
      ),
      options: [
        { label: "Look one way before crossing", isCorrect: false },
        { label: "Close your eyes and run", isCorrect: false },
        { label: "Stop, Look, Listen and Think", isCorrect: true },
        { label: "Cross only if someone else does", isCorrect: false },
      ],
    },
    {
      heading: "🚸 Zebra Crossing Zones",
      subHeading: "What are they and how do they help?",
      imageKeyword: "zebra crossing for kids",
      content: (
        <div className="space-y-2 text-sm">
          <p>
            🚶 Zebra crossings are striped areas on the road where cars must
            stop for people walking.
          </p>
          <p>
            🛑 Drivers see the white lines and slow down. Kids should still
            check both sides before crossing.
          </p>
        </div>
      ),
      options: [
        { label: "You can cross anywhere on the road", isCorrect: false },
        { label: "Zebra crossings are only for adults", isCorrect: false },
        { label: "Zebra crossings help cars see you", isCorrect: true },
        { label: "Kids can cross even if cars are moving", isCorrect: false },
      ],
    },
    {
      heading: "🛑 Safety Table Summary",
      subHeading: "A quick reminder of do’s and don’ts",
      imageKeyword: "child road safety infographic",
      content: (
        <table className="w-full text-sm table-auto border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Do ✅</th>
              <th className="p-2 border">Don't ❌</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Use zebra crossings</td>
              <td className="p-2 border">Run across roads</td>
            </tr>
            <tr>
              <td className="p-2 border">Look both ways</td>
              <td className="p-2 border">Use your phone while walking</td>
            </tr>
            <tr>
              <td className="p-2 border">Hold an adult's hand</td>
              <td className="p-2 border">Cross between parked cars</td>
            </tr>
          </tbody>
        </table>
      ),
      options: [
        { label: "Running is better than walking on roads", isCorrect: false },
        { label: "Hold an adult's hand while crossing", isCorrect: true },
        { label: "Phones help you cross safely", isCorrect: false },
        { label: "Parked cars are safe to cross between", isCorrect: false },
      ],
    },
    {
      heading: "🚥 Crossing Diagram",
      subHeading: "Follow the safe path!",
      imageKeyword: "kid at traffic light road crossing",
      content: (
        <div className="relative w-full h-52 bg-green-50 border border-green-300 rounded-lg p-4 text-sm">
          <p>⬛ = Road | 🟩 = Safe path | 🚸 = Crossing</p>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center font-mono">
            <div>⬛</div>
            <div>⬛</div>
            <div>⬛</div>
            <div>🚸</div>
            <div>⬛</div>
            <div>⬛</div>
            <div>⬛</div>

            <div>🟩</div>
            <div colSpan="5" className="col-span-5">
              ⬛
            </div>
            <div>🟩</div>
          </div>
        </div>
      ),
      options: [
        {
          label: "Walk on the road even without crossing signs",
          isCorrect: false,
        },
        { label: "Use the crossing path like 🚸 shown above", isCorrect: true },
        {
          label: "Jump over traffic to reach the other side",
          isCorrect: false,
        },
        { label: "Follow cars to cross roads faster", isCorrect: false },
      ],
    },
  ],
};

const CodeBlock = ({ code }) => (
  <SyntaxHighlighter language="jsx" style={dracula}>
    {code}
  </SyntaxHighlighter>
);

const CodeComparison = ({ wrong, correct }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div>
      <h3 className="text-red-500 font-semibold mb-2">🚫 Wrong</h3>
      <CodeBlock code={wrong} />
    </div>
    <div>
      <h3 className="text-green-500 font-semibold mb-2">✅ Correct</h3>
      <CodeBlock code={correct} />
    </div>
  </div>
);

const Quizes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [images, setImages] = useState({});
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const section = lessonData.sections[currentIndex];

  useEffect(() => {
    async function fetchImages() {
      const newImages = {};
      for (let i = 0; i < lessonData.sections.length; i++) {
        const sec = lessonData.sections[i];
        if (sec.imageKeyword) {
          try {
            const res = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                sec.imageKeyword
              )}&per_page=1`,
              {
                headers: {
                  Authorization:
                    "gz8rjS47EELDnyhiVGJ7zprnPMyZIdSdEMAiRgZFfrthBOUWb21qGp7A",
                },
              }
            );
            const data = await res.json();
            if (data.photos?.length) {
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

  const handleSelect = (questionIndex, optionIndex) => {
    setSelected((prev) => {
      const updated = [...prev];
      updated[questionIndex] = optionIndex;
      return updated;
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < lessonData.sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    let results = 0;
    for (let i = 0; i < lessonData.sections.length; i++) {
      const targetSection = lessonData.sections[i];
      for (let j = 0; j < targetSection.options.length; j++) {
        const result = selected[i];
        if (result === j && targetSection.options[j].isCorrect) {
          console.log(targetSection.options[j]);
          results++;
        }
      }
    }
    setResult(results);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll py-10">
      <div className="flex flex-col gap-2 w-[90%] md:w-[80%] lg:w-[800px] xl:w-[950px] h-[600px]">
        <div className="relative w-full rounded-xl bg-[#eaf4f4] overflow-hidden overflow-y-scroll p-3">
            {/* {!showResult && ()} */}
          <div className="w-full rounded-xl bg-[#f6fff8] overflow-hidden flex flex-col gap-4 custom-bar p-4">
            <h1 className="text-xl font-bold">{lessonData.title}</h1>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <h3 className="text-md font-medium text-gray-600">
              {section.subHeading}
            </h3>

            {images[currentIndex] && (
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "linear",
                }}
                src={images[currentIndex]}
                alt={section.imageKeyword || "lesson image"}
                width={150}
                height={100}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            )}

            {section.content}

            {section.code && (
              <>
                {section.code.type === "single" ? (
                  <CodeBlock code={section.code.correct} />
                ) : (
                  <CodeComparison
                    wrong={section.code.wrong}
                    correct={section.code.correct}
                  />
                )}
              </>
            )}

            <div className="grid grid-cols-2 gap-2 mt-4">
              {section.options.map((option, i) => {
                const isClicked = selected[currentIndex];
                const isSelected = selected[currentIndex] === i;
                const isCorrect = option.isCorrect;
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(currentIndex, i)}
                    className={cn(
                      "text-left px-4 py-2 rounded-xl border transition-all duration-300  border-gray-400",
                      isSelected && isCorrect
                        ? "bg-green-500"
                        : isSelected && !isCorrect
                        ? "bg-red-500"
                        : "bg-gray-200"
                    )}
                    whileTap={{ scale: 0.97 }}
                    disabled={isClicked}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="mt-6 self-end bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Prev
              </button>
              {currentIndex < lessonData.sections.length - 1 && (
                <button
                  onClick={handleNext}
                  className="mt-6 self-end bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Next
                </button>
              )}
              {currentIndex === lessonData.sections.length - 1 && (
                <button
                  onClick={handleSubmit}
                  className="mt-6 self-end bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizes;
