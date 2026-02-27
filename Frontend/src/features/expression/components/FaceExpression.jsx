import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/livefeed.css";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="feed">
      <h1>MoodSync AI</h1>
      < video
        ref={videoRef}
        style={{
          width: "400px",
          borderRadius: "12px",
          transform: "scaleX(-1)",
        }}
        playsInline
      />
      <h2>{expression}</h2>
      <button className="btn"
        onClick={() => detect({ videoRef, setExpression, landmarkerRef })}
      >
        Detect
      </button>
    </div>
  );
}
