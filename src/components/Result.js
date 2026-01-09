import React from "react";

const Result = ({ score, onRestart }) => {
  let grade = "";
  let message = "";

  if (score >= 50) {
    grade = "Well Done";
    message = "🎉 Excellent! You nailed it!";
  } else if (score >= 40) {
    grade = "Excellent";
    message = "🌟 Great job! Almost perfect.";
  } else if (score >= 30) {
    grade = "Good";
    message = "🙂 Good effort! Keep practicing.";
  } else {
    grade = "No Good";
    message = "😔 No Good! Better luck next time.";
  }

  return (
    <div className="card result">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / 53</p>
      <p className="grade">Grade: {grade}</p>
      <p className="message">{message}</p>
      <div className="restart-container">
        <button onClick={onRestart}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default Result;
