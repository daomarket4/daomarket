import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endTime, percentage, fundingCancelled }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(Number(endTime) * 1000) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerIsFinished = Object.keys(timeLeft).every((interval) => {
    return !timeLeft[interval];
  });

  return (
    <div>
      {fundingCancelled ? (
        <span className="text-red-500">펀딩 취소</span>
      ) : timerIsFinished ? (
        <span className="text-blue-500">펀딩 종료</span>
      ) : percentage >= 100 ? (
        <span className="text-green-500">펀딩율 100% 도달!!</span>
      ) : (
        Object.keys(timeLeft).map((interval) => {
          if (!timeLeft[interval]) {
            return null;
          }
          return (
            <span key={interval}>
              {timeLeft[interval]}
              {interval}{" "}
            </span>
          );
        })
      )}
    </div>
  );
};

export default CountdownTimer;
