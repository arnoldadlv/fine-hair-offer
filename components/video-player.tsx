"use client";

import { useState, useRef } from "react";

export default function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square px-2 sm:px-0">
      <video
        autoPlay
        className="w-full h-full rounded-lg"
        controls
        loop
        muted
        playsInline
        ref={videoRef}
        src="https://stvsvideos.blob.core.windows.net/videos/copy_74A73A3C-9717-40D1-B849-45E6D7CA6FF5.mov"
      />

      <button
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        onClick={toggleMute}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
