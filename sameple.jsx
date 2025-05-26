// import React, { useState } from "react";
// import Sketch from "react-p5";

// const dataArray = [
//   {
//     heading: "History of China",
//     desc: "China is a great source of energy as we all know and a great power in the tech world.",
//     mainPoint: "China's first prime minister was ABC.",
//   },
//   {
//     heading: "Invention of Internet",
//     desc: "The internet was invented to share research quickly across long distances.",
//     mainPoint: "It was developed by DARPA in the USA.",
//   },
//   {
//     heading: "Space Exploration",
//     desc: "Humans first reached the moon in 1969.",
//     mainPoint: "Neil Armstrong was the first man to walk on the moon.",
//   },
// ];

// function AnimatedLesson({ data, onComplete }) {
//   let headingWords = [];
//   let descWords = [];
//   let mainPointsWords = [];

//   let wordIndex = 0;
//   let headingDone = false;
//   let descDone = false;
//   let pointsDone = false;

//   const setup = (p, canvasParentRef) => {
//     p.createCanvas(p.windowWidth * 0.7, p.windowHeight * 0.7).parent(
//       canvasParentRef
//     );
//     p.textFont("Georgia");
//     p.textAlign(p.LEFT, p.TOP);

//     headingWords = data.heading
//       .split(" ")
//       .map((text) => ({ text, opacity: 0 }));
//     descWords = data.desc.split(" ").map((text) => ({ text, opacity: 0 }));
//     mainPointsWords = data.mainPoint
//       .split(" ")
//       .map((text) => ({ text, opacity: 0 }));
//   };

//   const draw = (p) => {
//     p.background(0);
//     let x = 30;
//     let y = 40;

//     // Heading
//     p.textSize(24);
//     x = 30;
//     headingWords.forEach(({ text, opacity }) => {
//       p.fill(255, 255 * opacity);
//       p.text(text, x, y);
//       x += p.textWidth(text + " ");
//     });

//     // Description
//     p.textSize(20);
//     x = 30;
//     y += 40;
//     descWords.forEach(({ text, opacity }) => {
//       p.fill(200, 200 * opacity);
//       p.text(text, x, y);
//       x += p.textWidth(text + " ");
//     });

//     // Main Point
//     p.textSize(20);
//     x = 30;
//     y += 40;
//     mainPointsWords.forEach(({ text, opacity }) => {
//       p.fill(180, 180 * opacity);
//       p.text(text, x, y);
//       x += p.textWidth(text + " ");
//     });

//     // Animation logic
//     if (!headingDone) {
//       const word = headingWords[wordIndex];
//       word.opacity += 0.17;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= headingWords.length) {
//           headingDone = true;
//           wordIndex = 0;
//         }
//       }
//     } else if (!descDone) {
//       const word = descWords[wordIndex];
//       word.opacity += 0.17;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= descWords.length) {
//           descDone = true;
//           wordIndex = 0;
//         }
//       }
//     } else if (!pointsDone) {
//       const word = mainPointsWords[wordIndex];
//       word.opacity += 0.17;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= mainPointsWords.length) {
//           pointsDone = true;
//           wordIndex = 0;
//           setTimeout(() => {
//             onComplete(); // Trigger next lesson
//           }, 1500); // wait before moving on
//         }
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "70vw",
//         height: "70vh",
//         margin: "40px auto",
//         borderRadius: "20px",
//         overflow: "hidden",
//         border: "2px solid white",
//         backgroundColor: "black",
//       }}
//     >
//       <Sketch setup={setup} draw={draw} />
//     </div>
//   );
// }

// export default function TextQuestion() {
//   const [lessonIndex, setLessonIndex] = useState(0);

//   const handleComplete = () => {
//     if (lessonIndex === dataArray.length - 1) return;
//     setLessonIndex((prev) => (prev + 1) % dataArray.length);
//   };

//   return (
//     <AnimatedLesson
//       key={lessonIndex}
//       data={dataArray[lessonIndex]}
//       onComplete={handleComplete}
//     />
//   );
// }

// import React, { useState } from "react";
// import Sketch from "react-p5";

// const dataArray = [
//   {
//     heading: "Addition",
//     question: "2 + 4",
//     desc: "2 plus 4 is equal to 6",
//     answer: "6",
//     dialogue: "Addition of 2 plus 4 is equal to 6",
//   },
//   {
//     heading: "Addition",
//     question: "7 + 5",
//     desc: "7 plus 5 is equal to 12",
//     answer: "12",
//     dialogue: "Addition of 7 plus 5 is equal to 12",
//   },
//   {
//     heading: "Addition",
//     question: "13 + 8",
//     desc: "13 plus 8 is equal to 21",
//     answer: "21",
//     dialogue: "Addition of 13 plus 8 is equal to 21",
//   },
//   {
//     heading: "Addition",
//     question: "24 + 17",
//     desc: "24 plus 17 is equal to 41",
//     answer: "41",
//     dialogue: "Addition of 24 plus 17 is equal to 41",
//   },
//   {
//     heading: "Addition",
//     question: "56 + 39",
//     desc: "56 plus 39 is equal to 95",
//     answer: "95",
//     dialogue: "Addition of 56 plus 39 is equal to 95",
//   },
// ];

// function AnimatedLesson({ data, onComplete }) {
//   let headingWords = [];
//   let questionWords = [];
//   let answerWords = [];
//   let descWords = [];

//   let wordIndex = 0;
//   let headingDone = false;
//   let questionDone = false;
//   let answerDone = false;
//   let descDone = false;

//   const setup = (p, canvasParentRef) => {
//     p.createCanvas(p.windowWidth * 0.7, p.windowHeight * 0.7).parent(
//       canvasParentRef
//     );
//     p.textFont("Georgia");
//     p.textAlign(p.LEFT, p.TOP);

//     headingWords = data.heading
//       .split(" ")
//       .map((text) => ({ text, opacity: 0 }));
//     questionWords = data.question
//       .split(" ")
//       .map((text) => ({ text, opacity: 0 }));
//     answerWords = data.answer.split(" ").map((text) => ({ text, opacity: 0 }));
//     descWords = data.desc.split(" ").map((text) => ({ text, opacity: 0 }));
//   };

//   const draw = (p) => {
//     p.background(0);

//     // Top-left heading
//     p.textSize(28);
//     let hx = 30;
//     let hy = 20;
//     headingWords.forEach(({ text, opacity }) => {
//       p.fill(255, 255 * opacity);
//       p.text(text, hx, hy);
//       hx += p.textWidth(text + " ");
//     });

//     // Center Question
//     p.textSize(48);
//     p.textAlign(p.CENTER, p.CENTER);
//     let centerX = p.width / 2;
//     let centerY = p.height / 2 - 30;

//     let questionText = "";
//     questionWords.forEach(({ text, opacity }) => {
//       p.fill(255, 255 * opacity);
//       p.text(
//         text,
//         centerX + p.textWidth(questionText) - p.textWidth(data.question) / 2,
//         centerY
//       );
//       questionText += text + " ";
//     });

//     // Center Answer
//     p.textSize(40);
//     let answerText = "";
//     answerWords.forEach(({ text, opacity }) => {
//       p.fill(255, 255 * opacity); // Slight color variation
//       p.text(
//         text,
//         centerX + p.textWidth(answerText) - p.textWidth(data.answer) / 2,
//         centerY + 60
//       );
//       answerText += text + " ";
//     });

//     // Bottom-center Description
//     p.textSize(22);
//     let descText = "";
//     let descX = centerX - p.textWidth(data.desc) / 2;
//     let descY = p.height - 60;
//     p.textAlign(p.LEFT, p.TOP);
//     descWords.forEach(({ text, opacity }) => {
//       p.fill(255, 255 * opacity);
//       p.text(text, descX, descY);
//       descX += p.textWidth(text + " ");
//     });

//     // Animation logic
//     const fadeSpeed = 0.1;

//     if (!headingDone) {
//       const word = headingWords[wordIndex];
//       word.opacity += fadeSpeed;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= headingWords.length) {
//           headingDone = true;
//           wordIndex = 0;
//         }
//       }
//     } else if (!questionDone) {
//       const word = questionWords[wordIndex];
//       word.opacity += fadeSpeed;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= questionWords.length) {
//           questionDone = true;
//           wordIndex = 0;
//         }
//       }
//     } else if (!answerDone) {
//       const word = answerWords[wordIndex];
//       word.opacity += fadeSpeed;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= answerWords.length) {
//           answerDone = true;
//           wordIndex = 0;
//         }
//       }
//     } else if (!descDone) {
//       const word = descWords[wordIndex];
//       word.opacity += fadeSpeed;
//       if (word.opacity >= 1) {
//         word.opacity = 1;
//         wordIndex++;
//         if (wordIndex >= descWords.length) {
//           descDone = true;
//           wordIndex = 0;
//           setTimeout(() => {
//             onComplete();
//           }, 1800);
//         }
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "70vw",
//         height: "70vh",
//         margin: "40px auto",
//         borderRadius: "20px",
//         overflow: "hidden",
//         border: "2px solid white",
//         backgroundColor: "black",
//       }}
//     >
//       <Sketch setup={setup} draw={draw} />
//     </div>
//   );
// }

// export default function TextQuestion() {
//   const [lessonIndex, setLessonIndex] = useState(0);

//   const handleComplete = () => {
//     if (lessonIndex === dataArray.length - 1) return;
//     setLessonIndex((prev) => (prev + 1) % dataArray.length);
//   };

//   return (
//     <AnimatedLesson
//       key={lessonIndex}
//       data={dataArray[lessonIndex]}
//       onComplete={handleComplete}
//     />
//   );
// }
