import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      console.log("Update time");
      setTime(new Date());
    }, 1000);
  }, []);

  return <p>Current time is: {time.toLocaleString()}</p>;
};

export default Clock;
