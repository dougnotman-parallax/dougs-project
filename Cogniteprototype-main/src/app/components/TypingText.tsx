import { useState, useEffect, useRef } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypingText({ text, speed = 10, onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const completedForTextRef = useRef<string | null>(null);
  /** Stable ref so parent re-renders (new inline onComplete) do not reset the typing interval effect */
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    completedForTextRef.current = null;
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
    if (
      onCompleteRef.current &&
      text.length > 0 &&
      currentIndex === text.length &&
      completedForTextRef.current !== text
    ) {
      completedForTextRef.current = text;
      onCompleteRef.current();
    }
  }, [currentIndex, text, speed]);

  return <>{displayedText}</>;
}
