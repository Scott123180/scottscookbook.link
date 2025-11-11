import * as React from "react";

type WakeLockSentinel = any; // from TS lib when available

export function useWakeLock() {
  const [supported, setSupported] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);
  const sentinelRef = React.useRef<WakeLockSentinel | null>(null);
  const noSleepRef = React.useRef<any>(null); // fallback

  // Lazy-load NoSleep only if needed
  const ensureNoSleep = async () => {
    if (noSleepRef.current) return noSleepRef.current;
    const mod = await import("nosleep.js");          // npm i nosleep.js
    noSleepRef.current = new mod.default();
    return noSleepRef.current;
  };

  React.useEffect(() => {
    setSupported(Boolean((navigator as any).wakeLock?.request));
  }, []);

  const request = React.useCallback(async () => {
    try {
      if ((document as any).hidden) await document.documentElement.requestFullscreen?.();
      if ((navigator as any).wakeLock?.request) {
        sentinelRef.current = await (navigator as any).wakeLock.request("screen");
        setActive(true);
        // If tab becomes hidden, some browsers release wake lock → re-acquire on visibility change
        const handleRelease = () => setActive(false);
        sentinelRef.current.addEventListener?.("release", handleRelease);
      } else {
        // Fallback: NoSleep uses a tiny hidden looping video to prevent sleep
        const noSleep = await ensureNoSleep();
        noSleep.enable();
        setActive(true);
      }
    } catch (e) {
      console.warn("Wake lock request failed:", e);
      setActive(false);
      throw e;
    }
  }, []);

  const release = React.useCallback(async () => {
    try {
      if (sentinelRef.current) {
        await sentinelRef.current.release?.();
        sentinelRef.current = null;
      }
      if (noSleepRef.current) {
        noSleepRef.current.disable();
      }
    } finally {
      setActive(false);
    }
  }, []);

  // Re-acquire on visibility change when user wanted it active
  React.useEffect(() => {
    const onVisibility = async () => {
      if (active && supported && !(document as any).hidden) {
        try {
          sentinelRef.current = await (navigator as any).wakeLock.request("screen");
          setActive(true);
        } catch (e) {
          console.warn("Reacquire wake lock failed:", e);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, supported]);

  React.useEffect(() => {
    return () => {
      // cleanup on unmount
      release();
    };
  }, [release]);

  return {
    isSupported: supported || true, // we have a fallback, so “functionally supported”
    isActive: active,
    enable: request,
    disable: release,
  };
}
