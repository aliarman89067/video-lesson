import { useEffect, useRef, useState } from "react";

export default function Note() {
  const paperRef = useRef(null);
  const [dotsCount, setDotsCount] = useState(0);

  const getCirclesSize = () => {
    const sizes = [3.5, 4];
    const sizeIndex = Math.floor(Math.random() * sizes.length);
    return { width: sizes[sizeIndex] * 4, height: sizes[sizeIndex] * 4 };
  };
  useEffect(() => {
    const { height } = paperRef.current.getBoundingClientRect();
    setDotsCount(height / 24);
  }, []);
  return (
    <section className="w-full h-screen grid grid-cols-[0.3fr_1fr] bg-black/95">
      <div className="w-full h-full border-r border-gray-500"></div>
      <div className="flex flex-col items-center justify-center">
        <div
          ref={paperRef}
          className="w-[80%] h-[80%] rounded-xl bg-[#f8edeb] overflow-hidden flex gap-3"
        >
          <div className="flex flex-col gap-2 px-1 py-3">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <div
                style={getCirclesSize()}
                key={index}
                className={`rounded-full bg-black/95`}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 py-3 pr-3 w-full">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-[#212529] whitespace-nowrap lily-script-one-regular">
                  What is computer?
                </h2>
                <div className="w-full h-3 bg-pink-200" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
