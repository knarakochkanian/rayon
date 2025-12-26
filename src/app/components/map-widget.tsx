"use client";

import { useEffect, useRef } from "react";

export function MapWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const createMap = () => {
      if (!isMounted || mapRef.current || !containerRef.current) return;
      const ymaps = (window as any).ymaps;
      if (!ymaps) return;

      ymaps.ready(() => {
        if (!isMounted || mapRef.current || !containerRef.current) return;
        mapRef.current = new ymaps.Map(containerRef.current, {
          center: [55.751574, 37.573856],
          zoom: 11,
          controls: ["zoomControl"],
        });
      });
    };

    const poller = setInterval(() => {
      if ((window as any).ymaps) {
        clearInterval(poller);
        createMap();
      }
    }, 300);

    createMap();

    return () => {
      isMounted = false;
      clearInterval(poller);
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    />
  );
}
