// src/components/Quiz.js
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Timer from "./Timer";
import { questions } from "../data/questions";

// 🔊 Sounds (from public folder)
const clickSound = new Audio(process.env.PUBLIC_URL + "/sounds/click.mp3");
const correctSound = new Audio(process.env.PUBLIC_URL + "/sounds/correct.mp3");
const wrongSound = new Audio(process.env.PUBLIC_URL + "/sounds/wrong.mp3");
const finishSound = new Audio(process.env.PUBLIC_URL + "/sounds/finish.mp3");

const Quiz = ({ onFinish, onExit }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const q = questions[index];

  // ✅ Option select handler
  const handleSelect = (i) => {
    setSelected(i);
    clickSound.play(); // Play click
    if (i === q.answer) {
      correctSound.play(); // Play correct
    } else {
      wrongSound.play(); // Play wrong
    }
  };

  // ✅ Next question
  const nextQuestion = useCallback(() => {
    setScore((prevScore) => (selected === q.answer ? prevScore + 1 : prevScore));
    setSelected(null);

    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      finishSound.play();
      const finalScore = selected === q.answer ? score + 1 : score;
      onFinish(finalScore);
    }
  }, [index, selected, q, score, onFinish]);

  // ✅ Previous question
  const prevQuestion = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelected(null);
    }
  };

  // ✅ Timer callback
  const onTimeUp = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  return (
    <motion.div
      className="card"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {/* Header */}
      <div className="quiz-header">
        <h2>
          Question {index + 1} / {questions.length}
        </h2>
        <button className="close-btn" onClick={onExit}>
          ×
        </button>
      </div>

      {/* Timer */}
      <Timer duration={30} onTimeUp={onTimeUp} />

      {/* Question */}
      <p>{q.question}</p>

      {/* Options */}
      <div className="options">
        {q.options.map((opt, i) => (
          <label
            key={i}
            className={`option ${selected === i ? "selected" : ""}`}
            onClick={() => handleSelect(i)}
          >
            <input
              type="radio"
              name={`option-${index}`}
              checked={selected === i}
              onChange={() => handleSelect(i)}
            />
            {opt}
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="actions">
        <button disabled={index === 0} onClick={prevQuestion}>
          Back
        </button>
        <button onClick={nextQuestion}>Next</button>
      </div>
    </motion.div>
  );
};

export default Quiz;
