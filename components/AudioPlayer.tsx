"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Track = {
  id: string;
  title: string;
  ensemble: string;
  src: string;
  duration: number;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  track,
  activeId,
  onPlay,
}: {
  track: Track;
  activeId: string | null;
  onPlay: (id: string) => void;
}) {
  const t = useTranslations("music");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  const isActive = activeId === track.id;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isActive && playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    }
  }, [isActive, playing]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    onPlay(track.id);
    void audio.play();
    setPlaying(true);
  }

  return (
    <div className="border-b border-line py-4 sm:py-5">
      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setCurrent(audio.currentTime);
          setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setCurrent(0);
        }}
      />
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
          aria-label={`${playing ? "Pause" : "Play"} ${track.title}`}
        >
          {playing ? (
            <span className="flex gap-1">
              <span className="h-3 w-0.5 bg-current" />
              <span className="h-3 w-0.5 bg-current" />
            </span>
          ) : (
            <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{track.title}</p>
              <p className="text-sm text-ink-soft">
                {t("performedBy")} {track.ensemble}
              </p>
            </div>
            <p className="shrink-0 pt-0.5 text-[0.7rem] tabular-nums text-ink-soft sm:text-xs">
              {formatTime(current)} / {formatTime(track.duration)}
            </p>
          </div>
          <div className="mt-3 h-px bg-line">
            <div
              className="h-px bg-ink transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrackList({ tracks }: { tracks: Track[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div>
      {tracks.map((track) => (
        <AudioPlayer
          key={track.id}
          track={track}
          activeId={activeId}
          onPlay={setActiveId}
        />
      ))}
    </div>
  );
}
