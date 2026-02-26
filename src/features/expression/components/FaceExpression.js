import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let stream;

    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1
        }
      );

      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      detect();
    };

    const detect = () => {
      if (!landmarkerRef.current || !videoRef.current) return;
    };

    init();
  }, []);
}