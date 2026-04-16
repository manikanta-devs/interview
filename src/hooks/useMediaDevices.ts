import { useState, useRef, useCallback } from "react";

type PermissionStatus = "idle" | "requesting" | "granted" | "denied" | "unsupported";

export function useMediaDevices() {
  const [status, setStatus] = useState<PermissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const requestAccess = useCallback(async (video = true, audio = true) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("unsupported");
      setError("Your browser does not support camera/microphone access.");
      return null;
    }

    setStatus("requesting");
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video ? { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } : false,
        audio,
      });
      streamRef.current = stream;
      setStatus("granted");

      if (videoRef.current && video) {
        videoRef.current.srcObject = stream;
      }

      return stream;
    } catch (err: any) {
      setStatus("denied");
      if (err.name === "NotAllowedError") {
        setError("Permission denied. Please allow camera/microphone access in your browser settings.");
      } else if (err.name === "NotFoundError") {
        setError("No camera or microphone found on this device.");
      } else {
        setError("Could not access camera/microphone: " + err.message);
      }
      return null;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus("idle");
  }, []);

  return { status, error, videoRef, streamRef, requestAccess, stopStream };
}
