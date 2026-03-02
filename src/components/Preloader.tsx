import { useState, useEffect } from "react";
import logo from "@/assets/swiftsite-logo.svg";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    // After logo animation completes, start fade-out
    const timer = setTimeout(() => setPhase("out"), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "out") {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div
      className="preloader-overlay"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 0.4s ease-out",
      }}
    >
      <div className="preloader-content">
        <img
          src={logo}
          alt="SwiftLift"
          className="preloader-logo"
        />
        <svg
          className="preloader-accent"
          width="40"
          height="2"
          viewBox="0 0 40 2"
        >
          <line
            x1="0"
            y1="1"
            x2="40"
            y2="1"
            stroke="hsl(275, 51%, 46%)"
            strokeWidth="2"
            strokeLinecap="round"
            className="preloader-line"
          />
        </svg>
      </div>
    </div>
  );
};

export default Preloader;
