import { useEffect, useRef } from 'react';
import { api } from '../lib/api';

const HEARTBEAT_INTERVAL = 60_000; // 60 seconds
const MAX_DELTA = 120; // cap at 120 seconds

export function useHeartbeat(
  courseSlug: string | undefined,
  moduleSlug: string | undefined,
  lessonSlug: string | undefined
) {
  const lastBeatRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!courseSlug || !moduleSlug || !lessonSlug) return;

    lastBeatRef.current = Date.now();

    const sendBeat = () => {
      const now = Date.now();
      const delta = Math.min(Math.round((now - lastBeatRef.current) / 1000), MAX_DELTA);
      lastBeatRef.current = now;

      api.heartbeat(courseSlug, {
        module_slug: moduleSlug,
        lesson_slug: lessonSlug,
        time_delta_seconds: delta,
      }).catch(() => {
        // Silently fail — non-critical
      });
    };

    // Periodic heartbeat
    const interval = setInterval(sendBeat, HEARTBEAT_INTERVAL);

    // Send on tab blur
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        sendBeat();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      // Send final beat on cleanup (lesson navigation)
      sendBeat();
    };
  }, [courseSlug, moduleSlug, lessonSlug]);
}
