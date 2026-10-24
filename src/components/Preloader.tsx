"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Logo from "@/components/Logo";

const ReadyContext = createContext({ ready: false });

export function useReady() {
  return useContext(ReadyContext);
}

export default function SiteLoader({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    // Lock page while loader is visible
    document.documentElement.classList.add("loader-active");
    document.body.classList.add("loader-active");

    // Show logo only once
    const timer = window.setTimeout(() => {
      root.style.display = "none";

      document.documentElement.classList.remove(
        "loader-active"
      );

      document.body.classList.remove(
        "loader-active"
      );

      setReady(true);
    }, 1800);

    return () => {
      window.clearTimeout(timer);

      document.documentElement.classList.remove(
        "loader-active"
      );

      document.body.classList.remove(
        "loader-active"
      );
    };
  }, []);

  return (
    <ReadyContext.Provider value={{ ready }}>
      {!ready && (
        <div
          ref={rootRef}
          aria-hidden="true"
          className="
            site-loader
            pointer-events-none
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-white
          "
        >
          <div className="flex flex-col items-center">
            <Logo
              tone="light"
              size="md"
            />
          </div>
        </div>
      )}

      <noscript>
        <style>
          {`
            .site-loader {
              display: none !important;
            }
          `}
        </style>
      </noscript>

      {children}
    </ReadyContext.Provider>
  );
}