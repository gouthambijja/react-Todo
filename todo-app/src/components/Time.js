import React, { useEffect, useState } from "react";

function Time() {
  let time = new Date();
  time = time.toLocaleTimeString();
  const [Htime, SetTime] = useState(time);
  useEffect(() => {
    const id = setInterval(() => {
      time = new Date();
      time = time.toLocaleTimeString();
      SetTime(time);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });
  return <div>{Htime}</div>;
}

export default Time;
