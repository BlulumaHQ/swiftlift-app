import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "cookie_consent";

type ConsentState = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const getStoredConsent = (): string | null => {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
};

const storeConsent = (value: string) => {
  try { localStorage.setItem(CONSENT_KEY, value); } catch {}
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({ essential: true, analytics: true, marketing: false });

  useEffect(() => {
    if (getStoredConsent()) return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    storeConsent(JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setVisible(false);
    setShowSettings(false);
  };

  const savePrefs = () => {
    storeConsent(JSON.stringify(prefs));
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ background: "#fff", borderTop: "1px solid #E5E7EB", boxShadow: "0 -2px 10px rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm" style={{ color: "#333", lineHeight: 1.5 }}>
            We use cookies to improve your experience and analyze traffic. You can accept all cookies or manage your preferences.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={accept}
              className="text-sm font-medium px-4 py-2.5 rounded-md transition-colors w-full sm:w-auto"
              style={{ background: "#5887DA", color: "#fff" }}
            >
              Accept All
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="text-sm underline-offset-2 hover:underline transition-colors whitespace-nowrap"
              style={{ color: "#666" }}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full max-w-md rounded-lg p-6 animate-in fade-in zoom-in-95 duration-200"
            style={{ background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
              <X className="h-4 w-4" style={{ color: "#333" }} />
            </button>
            <h3 className="text-base font-semibold mb-4" style={{ color: "#333" }}>Cookie Preferences</h3>

            {/* Essential */}
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "#333" }}>Essential Cookies</p>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>Always active — required for the site to function</p>
              </div>
              <div className="px-3 py-1 rounded text-xs font-medium" style={{ background: "#f0f0f0", color: "#666" }}>Always On</div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "#333" }}>Analytics Cookies</p>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>Help us understand how visitors use the site</p>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                className={cn("w-10 h-5 rounded-full transition-colors relative")}
                style={{ background: prefs.analytics ? "#5887DA" : "#ccc" }}
              >
                <span className="block w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-transform" style={{ left: prefs.analytics ? 20 : 2 }} />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium" style={{ color: "#333" }}>Marketing Cookies</p>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>Used for targeted advertising</p>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                className={cn("w-10 h-5 rounded-full transition-colors relative")}
                style={{ background: prefs.marketing ? "#5887DA" : "#ccc" }}
              >
                <span className="block w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-transform" style={{ left: prefs.marketing ? 20 : 2 }} />
              </button>
            </div>

            <button
              onClick={savePrefs}
              className="w-full mt-5 text-sm font-medium px-4 py-2.5 rounded-md transition-colors"
              style={{ background: "#5887DA", color: "#fff" }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
