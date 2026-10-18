/**
 * Safe Fullscreen Helper
 * Toggles native browser fullscreen if allowed by iframe permissions,
 * combined with CSS fixed overlay mode for guaranteed fullscreen experience.
 */

export function toggleNativeFullscreen(element?: HTMLElement) {
  const target = element || document.documentElement;
  try {
    if (!document.fullscreenElement) {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(() => {
          // If browser or iframe policy blocks native fullscreen, CSS overlay handles it
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  } catch {
    // Ignore native fullscreen restriction
  }
}

export function exitNativeFullscreen() {
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  } catch {
    // Ignore
  }
}
