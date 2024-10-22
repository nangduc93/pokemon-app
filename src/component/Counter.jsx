import { useState, useEffect } from "react";

const Counter = ({ disabled }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Luôn chạy sau mỗi lần render");
  });

  useEffect(() => {
    console.log(
      "Chỉ chạy sau lần đầu tiên render (hiển thị) hay còn gọi là mounted"
    );
  }, []); // mảng dependencies rỗng

  useEffect(() => {
    console.log(
      "Chạy sau lần đầu tiên render và sau mỗi lần giá trị trong dependencies thay đổi"
    );
  }, [count]);

  return (
    <div>
      <button disabled={disabled} onClick={() => setCount(count + 1)}>
        You click {count} time(s)
      </button>
    </div>
  );
};

export default Counter;
