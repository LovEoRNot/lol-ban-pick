import { useEffect, useState } from "react";

export default function useCountDown(maxTime = 120) {
  const [time, setTime] = useState(maxTime)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isOver = false;

    const countDown = () => {
      timer = setTimeout(() => {
        setTime(t => {
          if (t <= 0) {
            isOver = true;
            return t;
          }
          return t - 1;
        });

        // 倒计时结束的话就不再添加新的定时器了
        !isOver && countDown()
      }, 1000);
    }
    countDown();

    return () => clearTimeout(timer)
  }, [])

  return time
}