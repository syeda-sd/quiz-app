// src/components/Welcome.js
// // src/components/Welcome.js
import React from "react";

const Welcome = ({ onStart }) => {
  return (
    <div className="card welcome">
      <h1>Welcome to the Quiz-App!</h1>
      <p>Test your knowledge with 53 fun questions. You have 30 seconds per question. Good luck! Build By: Sidra Gillani🦋</p>
      <button className="start-btn" onClick={onStart}>Start Now</button>
    </div>
  );
};

export default Welcome;
