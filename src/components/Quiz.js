// src/components/Quiz.js
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Timer from "./Timer";
import { questions } from "../data/questions";

// Sounds
const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const finishSound = new Audio("/sounds/finish.mp3");

const Quiz = ({ onFinish, onExit }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  // Option select
  const handleSelect = (i) => {
    setSelected(i);
    clickSound.play();
    if (i === questions[index].answer) {
      correctSound.play();
    } else {
      wrongSound.play();
    }
  };

  // Next question (warning-free)
  const nextQuestion = () => {
    setScore(prevScore =>
      selected === questions[index].answer ? prevScore + 1 : prevScore
    );

    setSelected(null);

    if (index + 1 < questions.length) {
      setIndex(prev => prev + 1);
    } else {
      finishSound.play();
      // Final score calculation
      const finalScore =
        selected === questions[index].answer ? score + 1 : score;
      onFinish(finalScore);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      setSelected(null);
    }
  };

  // Timer callback
  const onTimeUp = useCallback(() => {
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, selected]);

  const q = questions[index];

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
              name="option"
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
