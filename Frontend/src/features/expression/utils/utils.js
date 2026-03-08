import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let lastExpression = "Neutral";

export const init = async ({ videoRef, landmarkerRef, streamRef }) => {
  // 1. Start camera stream immediately so user sees feed ASAP
  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  if (!videoRef.current) return;

  videoRef.current.srcObject = streamRef.current;
  videoRef.current.onloadedmetadata = () => {
    videoRef.current.play();
  };

  // 2. Load the model in background after stream is already showing
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });
};

export const detect = ({ videoRef, landmarkerRef, setExpression }) => {
  if (!landmarkerRef.current || !videoRef.current) return;

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now()
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let currentExpression = "Neutral";

    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
      currentExpression = "surprised";
    } else if (frownLeft > 0.004 && frownRight > 0.004) {
      currentExpression = "sad";
    }

    // FIX: update state only when expression changes
    if (currentExpression !== lastExpression) {
      lastExpression = currentExpression;
      setExpression(currentExpression);
    }

    return currentExpression;
  }
};