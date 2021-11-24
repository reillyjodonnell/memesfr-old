import React, { useState, useEffect } from 'react';
import '../CSS Components/Countdown.css';
export default function Countdown() {
  const [timerActive, setTimerActive] = useState(true);
  const [hoursTimer, setHoursTimer] = useState(1);
  const [minutesTimer, setMinutesTimer] = useState(0);
  const [secondsTimer, setSecondsTimer] = useState(3);
  const [timerMessage, setTimerMessage] = useState('');

  const countdownTimer = () => {
    if (secondsTimer > 0) {
      setSecondsTimer((seconds) => seconds - 1);
    } else if (secondsTimer === 0) {
      setSecondsTimer(0);
      if (minutesTimer > 0) {
        setMinutesTimer((prevMin) => prevMin - 1);
        setSecondsTimer(59);
      } else if (minutesTimer === 0 && hoursTimer >= 1) {
        setHoursTimer((prevHour) => prevHour - 1);
        setMinutesTimer(59);
        setSecondsTimer(59);
      } else {
        setTimerActive(false);
        setTimerMessage('A new memelord appears ');
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(countdownTimer, 1000);

    return function cleanup() {
      clearTimeout(timer);
    };
  });

  return (
    <div className="countdown-timer-container">
      <div className="countdown-timer">
        {timerActive ? (
          <>
            <div className="countdown-timer-message">
              <span>next memelord in:</span>
            </div>
            <div className="countdown-timer-time">
              <span className="countdown-timer-time">
                {hoursTimer < 10 ? `0${hoursTimer}` : hoursTimer}
              </span>
              <span className="countdown-timer-time">:</span>
              <span className="countdown-timer-time">
                {minutesTimer < 10 ? `0${minutesTimer}` : minutesTimer}
              </span>
              <span className="countdown-timer-time">:</span>
              <span className="countdown-timer-time">
                {secondsTimer < 10 ? `0${secondsTimer}` : secondsTimer}
              </span>
            </div>
          </>
        ) : (
          <div className="countdown-timer-message-container">
            <span className="countdown-timer-message">{timerMessage}</span>
            <span>👇👀👇</span>
          </div>
        )}
      </div>
    </div>
  );
}
