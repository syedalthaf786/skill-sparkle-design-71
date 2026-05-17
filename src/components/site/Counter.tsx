import { useEffect, useState } from "react";

type Props = {
  target: string;
  duration?: number;
};

export function Counter({ target, duration = 2000 }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const numericMatch = target.match(/^\d+(?:\.\d+)?/);
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : NaN;

    if (isNaN(numericValue)) {
      setCount(0);
      return;
    }

    let startTime = 0;
    const animate = (currentTime: number) => {
      if (startTime === 0) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 100);
    return () => clearTimeout(timer);
  }, [target, duration]);

  const suffix = target.replace(/^\d+(?:\.\d+)?/, "");

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
