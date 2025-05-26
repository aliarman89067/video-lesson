// Photosynthesis.jsx
import React from "react";
import Sketch from "react-p5";

// Define lesson content
const lessonSteps = [
  {
    type: "section",
    heading: "🌱 Introduction to Photosynthesis",
    subheading: "How Plants Make Their Food",
    body: "Photosynthesis is the process by which green plants convert light energy into chemical energy. Using sunlight, water, and carbon dioxide, plants produce glucose and release oxygen as a by-product.",
    dialogue:
      "This section introduces photosynthesis—the process by which plants make their own food using sunlight.",
  },
  {
    type: "section",
    heading: "☀️ The Photosynthesis Equation",
    subheading: "Chemical Representation",
    body: "The simplified equation for photosynthesis is: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. This means six molecules of carbon dioxide and six of water, using sunlight, produce one molecule of glucose and six of oxygen.",
    dialogue:
      "This part explains the photosynthesis equation in chemical terms. It’s how plants turn air and water into sugar and oxygen using sunlight.",
  },
  {
    type: "section",
    heading: "🌿 Chloroplasts and Pigments",
    subheading: "Where Photosynthesis Happens",
    body: "Photosynthesis takes place in chloroplasts, which contain the pigment chlorophyll. Chlorophyll absorbs light most efficiently in the blue and red parts of the spectrum and gives plants their green color.",
    dialogue:
      "This section covers where photosynthesis actually happens in the cell—the chloroplast—and the role of chlorophyll.",
  },
];

// Animation state variables
let headingWords = [];
let subheadingWords = [];
let bodyWords = [];
let wordIndex = 0;
let stepIndex = 0;
let timer = 0;
const STEP_DURATION = 7000;

export default function PhotosynthesisLesson() {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(p.windowWidth * 0.7, p.windowHeight * 0.7).parent(
      canvasParentRef
    );
    p.textFont("Georgia");
    p.textAlign(p.LEFT, p.TOP);
    parseStep(p, lessonSteps[stepIndex]);
  };

  const draw = (p) => {
    p.background(0);
    let x = 40;
    let y = 50;

    // Heading
    p.textSize(32);
    headingWords.forEach((word) => {
      p.fill(255, 255 * word.opacity);
      p.text(word.text, x, y);
      x += p.textWidth(word.text + " ");
    });

    // Subheading
    y += 50;
    x = 40;
    p.textSize(24);
    subheadingWords.forEach((word) => {
      p.fill(180, 255 * word.opacity);
      p.text(word.text, x, y);
      x += p.textWidth(word.text + " ");
    });

    // Body
    y += 60;
    x = 40;
    p.textSize(20);
    const lineHeight = 30;
    bodyWords.forEach((word) => {
      p.fill(255, 255 * word.opacity);
      p.text(word.text, x, y);
      x += p.textWidth(word.text + " ");
      if (x > p.width - 80) {
        x = 40;
        y += lineHeight;
      }
    });

    // Animate words
    if (wordIndex < bodyWords.length) {
      const word = bodyWords[wordIndex];
      word.opacity += 0.05;
      if (word.opacity >= 1) {
        word.opacity = 1;
        wordIndex++;
      }
    } else {
      timer += p.deltaTime;
      if (timer > STEP_DURATION) {
        stepIndex = (stepIndex + 1) % lessonSteps.length;
        parseStep(p, lessonSteps[stepIndex]);
        timer = 0;
      }
    }
  };

  const parseStep = (p, step) => {
    headingWords = step.heading
      .split(" ")
      .map((t) => ({ text: t, opacity: 0 }));
    subheadingWords = step.subheading
      .split(" ")
      .map((t) => ({ text: t, opacity: 0 }));
    bodyWords = step.body.split(" ").map((t) => ({ text: t, opacity: 0 }));
    wordIndex = 0;
  };

  return (
    <div
      style={{
        width: "70vw",
        height: "70vh",
        margin: "auto",
        marginTop: "5vh",
        borderRadius: "20px",
        overflow: "hidden",
        border: "2px solid white",
        backgroundColor: "black",
      }}
    >
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
