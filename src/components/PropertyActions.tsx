"use client";

import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";

type PropertyActionsProps = {
  propertyId: string;
  title: string;
  actions?: ("save" | "share")[];
  size?: "header" | "footer";
};

export default function PropertyActions({
  propertyId,
  title,
  actions = ["share", "save"],
  size = "header",
}: PropertyActionsProps) {
  const storageKey = `wintergreen:saved-property:${propertyId}`;
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const syncSavedState = () => {
      try {
        setSaved(window.localStorage.getItem(storageKey) === "true");
      } catch {
        setFeedback("Saved property status is unavailable in this browser.");
      }
    };

    syncSavedState();
    window.addEventListener("storage", syncSavedState);
    window.addEventListener("wintergreen:saved-properties-changed", syncSavedState);

    return () => {
      window.removeEventListener("storage", syncSavedState);
      window.removeEventListener("wintergreen:saved-properties-changed", syncSavedState);
    };
  }, [storageKey]);

  const toggleSaved = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);

    try {
      window.localStorage.setItem(storageKey, String(nextSaved));
      window.dispatchEvent(new Event("wintergreen:saved-properties-changed"));
      setFeedback(nextSaved ? "Property saved." : "Property removed from saved properties.");
    } catch {
      setFeedback("Could not save this property in this browser.");
    }
  };

  const shareProperty = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: `View ${title}`, url });
        setFeedback("Share menu opened.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setFeedback("Property link copied.");
        return;
      }

      setFeedback("Sharing is unavailable. Copy this page's address to share it.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setFeedback("Could not share this property. Please try again.");
    }
  };

  const buttonClassName =
    size === "header"
      ? "flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700/15 bg-white/60 text-black backdrop-blur-xl transition hover:border-emerald-500/40 hover:bg-emerald-100 hover:text-emerald-700"
      : "flex h-11 w-12 items-center justify-center rounded-xl border border-emerald-700/15 bg-white/70 text-black backdrop-blur-xl transition hover:border-emerald-500/40 hover:bg-emerald-100 hover:text-emerald-700";

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      {actions.includes("share") && (
        <button
          type="button"
          aria-label={`Share ${title}`}
          title="Share property"
          onClick={shareProperty}
          className={buttonClassName}
        >
          <Share2 size={size === "header" ? 15 : 16} />
        </button>
      )}

      {actions.includes("save") && (
        <button
          type="button"
          aria-label={saved ? `Remove ${title} from saved properties` : `Save ${title}`}
          aria-pressed={saved}
          title={saved ? "Remove from saved properties" : "Save property"}
          onClick={toggleSaved}
          className={`${buttonClassName} ${saved ? "text-emerald-700" : ""}`}
        >
          <Heart
            size={size === "header" ? 16 : 20}
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      )}

      {feedback && (
        <span
          role="status"
          className="absolute right-0 top-full z-20 mt-2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-[11px] text-white shadow-lg"
        >
          {feedback}
        </span>
      )}
    </div>
  );
}
