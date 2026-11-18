/**
 * VideoPlayer — a simulated lesson video (there are no real video files yet).
 *
 * A timer (setInterval) advances `time` by `speed` seconds every real second while playing.
 * Controls: play/pause, click-to-seek bar, speed (1x → 2x), captions, fullscreen;
 * the ← / → keys skip 10 seconds. When time reaches the end, onEnded() runs (marks the lesson done).
 * To use real videos later, put a <video> in the stage and drive the same state from its events.
 */
import { useEffect, useRef, useState } from 'react';
import { Captions, Maximize2, Pause, Play, RotateCcw, Volume2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { cn, formatClock } from '../../utils/format.js';
import './VideoPlayer.css';

// Speeds the speed button cycles through.
const SPEEDS = [1, 1.25, 1.5, 2];
// Sample caption lines (a new one every 20 "seconds").
const CAPTIONS = [
  'Let’s start by drawing what is actually happening.',
  'Notice how the horizontal speed never changes.',
  'Only the vertical part feels gravity.',
  'Now write down what we know, and what we need.',
];

/**
 * Simulated lesson player (no media file needed). Swap the stage for a <video>
 * element when real content is available — the controls API stays the same.
 */
export default function VideoPlayer({ lesson, course, onEnded }) {
  const { t } = useLanguage();
  // Lesson length in seconds.
  const duration = lesson.minutes * 60;
  // Player state: is it playing? current time (seconds), speed, captions on/off.
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [captions, setCaptions] = useState(true);
  const stageRef = useRef(null);
  // Keep the latest onEnded in a ref so the timer effect doesn't need to restart when it changes.
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;

  // New lesson → reset the player.
  useEffect(() => { setPlaying(false); setTime(0); }, [lesson.id]);

  useEffect(() => {
    // The "clock": only runs while playing; cleared on pause or when the component unmounts.
    if (!playing) return undefined;
    const id = window.setInterval(() => {
      setTime((prev) => {
        const next = prev + speed;
        if (next >= duration) {
          setPlaying(false);
          endedRef.current?.();
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, speed, duration]);

  // How far through the video we are, in %.
  const pct = (time / duration) * 100;
  const ended = time >= duration;

  // Play / pause. If the video already ended, start again from 0.
  const toggle = () => {
    if (ended) setTime(0);
    setPlaying((p) => !p);
  };

  // Convert the click position on the bar into a time (0% … 100% of the duration).
  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setTime(Math.round(ratio * duration));
  };

  // Keyboard: → jumps forward 10 s, ← jumps back 10 s.
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setTime((v) => Math.min(duration, v + 10));
    if (e.key === 'ArrowLeft') setTime((v) => Math.max(0, v - 10));
  };

  // Ask the browser for full screen. `?.` = only call it if the browser supports it.
  const fullscreen = () => stageRef.current?.requestFullscreen?.();
  const caption = CAPTIONS[Math.floor(time / 20) % CAPTIONS.length];

  return (
    <div ref={stageRef} className={cn('player', `tone-${course.tone}`, playing && 'is-playing')} onKeyDown={onKey}>
      {/* The big "screen". Clicking anywhere on it plays or pauses. */}
      <button type="button" className="player__stage" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
        <span className="player__bg" aria-hidden="true" />
        <span className="player__glyph" aria-hidden="true">{course.glyph}</span>
        <span className="player__title" aria-hidden="true">{lesson.title}</span>
        <span className="player__big" aria-hidden="true">
          {ended ? <RotateCcw size={30} /> : <Play size={30} fill="currentColor" />}
        </span>
        {captions && time > 0 && !ended && <span className="player__caption">{caption}</span>}
      </button>

      {/* Control bar: play, time, seek bar, speed, captions, volume, fullscreen. */}
      <div className="player__controls">
        <button type="button" className="player__btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <span className="player__time">{formatClock(time)} / {formatClock(duration)}</span>
        <div
          className="player__track"
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(time)}
          aria-valuetext={formatClock(time)}
          onClick={seek}
        >
          <span className="player__fill" style={{ width: `${pct}%` }} />
          <span className="player__knob" style={{ left: `${pct}%` }} />
        </div>
        <button type="button" className="player__btn player__btn--text" onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])} aria-label={`${t('learn.speed')} ${speed}x`}>
          {speed}x
        </button>
        <button type="button" className={cn('player__btn', captions && 'is-on')} onClick={() => setCaptions((c) => !c)} aria-pressed={captions} aria-label={t('learn.captions')}>
          <Captions size={18} />
        </button>
        <span className="player__btn player__btn--static" aria-hidden="true"><Volume2 size={18} /></span>
        <button type="button" className="player__btn" onClick={fullscreen} aria-label="Fullscreen"><Maximize2 size={17} /></button>
      </div>
    </div>
  );
}
