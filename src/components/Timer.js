// src/components/Timer.js

import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration);

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onTimeUp();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimeUp]);

  return <div className="timer">⏱ {time}s</div>;
};

export default Timer;
