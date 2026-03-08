import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/livefeed.css";

export default function FaceExpression({ onClick = () => {} }) {
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

  async function handleClick() {
    const detectedExpression = await detect({
      videoRef,
      setExpression,
      landmarkerRef,
    });
    if (detectedExpression) {
      onClick(detectedExpression);
    }
  }

  return (
    <div className="feed">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          style={{
            width: "400px",
            borderRadius: "12px",
            transform: "scaleX(-1)",
          }}
          playsInline
        />
        <h2 className="expression-badge">{expression}</h2>
      </div>

      <button className="btn detect-btn" onClick={handleClick}>
        Detect Mood
      </button>
    </div>
  );
}
