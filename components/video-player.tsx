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
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls
        src="https://stvsvideos.blob.core.windows.net/videos/copy_E44A1F42-9107-4A1D-B097-77CF0A414A18.mov"
        className="w-full h-full rounded-lg"
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
