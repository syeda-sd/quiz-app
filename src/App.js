import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { questions } from "./data/questions";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setScore(0);
    setScreen("quiz");
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setScreen("result");
  };

  const exitQuiz = () => {
    setScreen("welcome");
  };

  return (
    <div className="app">
      {screen === "welcome" && <Welcome onStart={startQuiz} onExit={exitQuiz} />}
      {screen === "quiz" && <Quiz onFinish={finishQuiz} onExit={exitQuiz} />}
      {screen === "result" && (
        <Result score={score} total={questions.length} onRestart={startQuiz} />
      )}
    </div>
  );
}

export default App;
