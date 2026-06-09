declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initData: string;
        initDataUnsafe: Record<string, unknown>;
        close: () => void;
        expand: () => void;
      };
    };
  }
}

export function initTelegramWebApp() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.warn("[Telegram WebApp] Not running inside Telegram — window.Telegram.WebApp unavailable.");
    return;
  }

  webApp.ready();
  console.log("[Telegram WebApp] Ready signal sent.");
  console.log("[Telegram WebApp] initData:", webApp.initData);
}
