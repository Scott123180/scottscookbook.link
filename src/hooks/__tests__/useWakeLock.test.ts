import { renderHook, act } from "@testing-library/react";
import { useWakeLock } from "../useWakeLock";

// ---- navigator.wakeLock mock helpers ----
function mockWakeLockSupported() {
  const sentinel = {
    release: jest.fn().mockResolvedValue(undefined),
    addEventListener: jest.fn(),
  };
  const wakeLock = {
    request: jest.fn().mockResolvedValue(sentinel),
  };
  Object.defineProperty(navigator, "wakeLock", {
    value: wakeLock,
    writable: true,
    configurable: true,
  });
  return { wakeLock, sentinel };
}

function removeWakeLock() {
  Object.defineProperty(navigator, "wakeLock", {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  removeWakeLock();
});

describe("useWakeLock", () => {
  describe("initial state", () => {
    it("isActive starts false", () => {
      const { result } = renderHook(() => useWakeLock());
      expect(result.current.isActive).toBe(false);
    });

    it("isSupported is always truthy (fallback available)", () => {
      const { result } = renderHook(() => useWakeLock());
      // Hook returns `supported || true`, so it's always truthy
      expect(result.current.isSupported).toBeTruthy();
    });
  });

  describe("enable() — native Wake Lock API available", () => {
    it("sets isActive to true after enable()", async () => {
      mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      expect(result.current.isActive).toBe(true);
    });

    it("calls navigator.wakeLock.request with 'screen'", async () => {
      const { wakeLock } = mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      expect(wakeLock.request).toHaveBeenCalledWith("screen");
    });
  });

  describe("disable()", () => {
    it("sets isActive to false after disable()", async () => {
      mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });
      expect(result.current.isActive).toBe(true);

      await act(async () => {
        await result.current.disable();
      });
      expect(result.current.isActive).toBe(false);
    });

    it("calls sentinel.release()", async () => {
      const { sentinel } = mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });
      await act(async () => {
        await result.current.disable();
      });

      expect(sentinel.release).toHaveBeenCalled();
    });
  });

  describe("enable() — NoSleep fallback (no native API)", () => {
    it("sets isActive to true via NoSleep fallback", async () => {
      removeWakeLock(); // ensure no native API
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      expect(result.current.isActive).toBe(true);
    });

    it("reuses the cached NoSleep instance on a second enable() call — line 13", async () => {
      removeWakeLock();
      const { result } = renderHook(() => useWakeLock());

      // First enable() creates the NoSleep instance
      await act(async () => {
        await result.current.enable();
      });

      // Second enable() should hit the early-return cache branch
      await act(async () => {
        await result.current.enable();
      });

      expect(result.current.isActive).toBe(true);
    });
  });

  describe("enable() — document.hidden fullscreen branch — line 25", () => {
    afterEach(() => {
      Object.defineProperty(document, "hidden", {
        value: false,
        writable: true,
        configurable: true,
      });
    });

    it("requests fullscreen when document is hidden before acquiring wake lock", async () => {
      const requestFullscreen = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(document, "hidden", {
        value: true,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, "requestFullscreen", {
        value: requestFullscreen,
        writable: true,
        configurable: true,
      });
      const { wakeLock } = mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      expect(requestFullscreen).toHaveBeenCalled();
      expect(wakeLock.request).toHaveBeenCalledWith("screen");
      expect(result.current.isActive).toBe(true);
    });
  });

  describe("sentinel 'release' event — handleRelease callback", () => {
    it("sets isActive to false when the OS revokes the wake lock sentinel", async () => {
      // Capture the handleRelease callback registered on the sentinel
      let capturedHandler: (() => void) | undefined;
      const sentinel = {
        release: jest.fn().mockResolvedValue(undefined),
        addEventListener: jest.fn((event: string, handler: () => void) => {
          if (event === "release") capturedHandler = handler;
        }),
      };
      Object.defineProperty(navigator, "wakeLock", {
        value: { request: jest.fn().mockResolvedValue(sentinel) },
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });
      expect(result.current.isActive).toBe(true);
      expect(capturedHandler).toBeDefined();

      // Simulate the OS revoking the lock
      act(() => {
        capturedHandler!();
      });

      expect(result.current.isActive).toBe(false);
    });
  });

  describe("enable() error handling — lines 39-41", () => {
    it("sets isActive to false and re-throws when wakeLock.request rejects", async () => {
      const wakeLock = {
        request: jest.fn().mockRejectedValue(new Error("Permission denied")),
      };
      Object.defineProperty(navigator, "wakeLock", {
        value: wakeLock,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useWakeLock());

      jest.spyOn(console, "warn").mockImplementation(() => {});
      await act(async () => {
        await expect(result.current.enable()).rejects.toThrow("Permission denied");
      });
      jest.restoreAllMocks();

      expect(result.current.isActive).toBe(false);
    });
  });

  describe("visibilitychange re-acquire — lines 62-67", () => {
    it("re-acquires wake lock when document becomes visible while active", async () => {
      const { wakeLock } = mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      // Fire visibilitychange; document.hidden is false in jsdom so the
      // condition (active && supported && !hidden) is satisfied.
      await act(async () => {
        document.dispatchEvent(new Event("visibilitychange"));
      });

      // request() called once on enable() + once on re-acquire
      expect(wakeLock.request).toHaveBeenCalledTimes(2);
    });

    it("does not re-acquire when not active", async () => {
      const { wakeLock } = mockWakeLockSupported();
      renderHook(() => useWakeLock());

      // Never called enable(), so active=false
      await act(async () => {
        document.dispatchEvent(new Event("visibilitychange"));
      });

      expect(wakeLock.request).not.toHaveBeenCalled();
    });

    it("handles re-acquire failure gracefully without throwing", async () => {
      const { wakeLock } = mockWakeLockSupported();
      const { result } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      // Make the next request fail
      wakeLock.request.mockRejectedValueOnce(new Error("re-acquire failed"));

      jest.spyOn(console, "warn").mockImplementation(() => {});
      await act(async () => {
        document.dispatchEvent(new Event("visibilitychange"));
      });
      jest.restoreAllMocks();

      // Should not throw; isActive retains its pre-event value
      expect(result.current.isActive).toBe(true);
    });
  });

  describe("cleanup on unmount", () => {
    it("does not throw when unmounted while active", async () => {
      mockWakeLockSupported();
      const { result, unmount } = renderHook(() => useWakeLock());

      await act(async () => {
        await result.current.enable();
      });

      expect(() => unmount()).not.toThrow();
    });
  });
});
