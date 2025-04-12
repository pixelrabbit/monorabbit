import React, { useRef, useState, useEffect } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";

export interface VideoProps {
  /** video source url */
  src: string;
  /** caption source url */
  captions: string;
  /** if ambient, only play/pause control is available */
  isAmbient: boolean;
  /** aspect ratio */
  aspectRatio: "inherent" | "fill" | "16:9" | "4:3" | "1:1";
}

export function Video({ src, isAmbient, captions, aspectRatio }: VideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(true); // Default to paused state
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
        startProgressUpdate();
      } else {
        videoRef.current.pause();
        stopProgressUpdate();
      }
      setIsPaused(!isPaused);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const startProgressUpdate = () => {
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const stopProgressUpdate = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(Number(event.target.value));
    }
  };

  useEffect(() => {
    if (!isAmbient && videoRef.current) {
      startProgressUpdate();
    }
    return () => stopProgressUpdate();
  }, [isAmbient]);

  useEffect(() => {
    const handleVideoEnd = () => {
      setIsPaused(true);
      stopProgressUpdate();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);



  return (
    <div className={wrapper()}>
      <video
        ref={videoRef}
        autoPlay={isAmbient}
        muted={isAmbient}
        loop={isAmbient}
        className={`aspect-video object-cover w-full`}
        aria-hidden={isAmbient}
      >
        <source src={src} />
        <track src={captions} kind="subtitles" srcLang="en" label="English" />
      </video>
      {!isAmbient && (
        <div className="absolute bottom-0 left-0 w-full flex items-center p-2 gap-2">
          <button
            onClick={toggleVideoPlayback}
            className=" bg-gray-800 text-white p-1 rounded"
          >
            {isPaused ? <PlayIcon className="size-6" aria-label="play video" aria-hidden={false} /> : <PauseIcon className="size-6" aria-label="pause video" aria-hidden={false} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className={progressInput()}
            aria-label="Video progress by percentage"
          />
        </div>
      )}
    </div>
  );
}

const wrapper = cva(['relative'])

const progressInput = cva([
  'w-full',
  'h-2',
  'bg-white',
  'appearance-none',
  'cursor-pointer',
  'flex-auto',
  '[&::-webkit-progress-bar]:bg-white',
  '[&::-webkit-progress-value]:bg-orange'

])

export default Video;
