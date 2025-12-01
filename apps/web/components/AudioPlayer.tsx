"use client";

import { useState, type ChangeEvent } from "react";

export type AudioPlayerProps = {
  title: string;
  artist?: string;
  duration: number;
  src?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
};

export function AudioPlayer({
  title,
  artist,
  duration,
  src,
  onPlay,
  onPause,
  onSeek,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    onSeek?.(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 3.3L15 10l-8.7 6.7V3.3z" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
            {artist && <p className="text-sm text-slate-600 dark:text-slate-400">{artist}</p>}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="relative">
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Seek audio"
          />
        </div>

        {!src && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            TODO: Connect to actual audio streaming service. Current implementation is a UI mock.
          </p>
        )}
      </div>
    </div>
  );
}

export const mockAudioPlayer: AudioPlayerProps = {
  title: "Q4 Strategy Recording",
  artist: "Jordan Smart",
  duration: 485,
};
