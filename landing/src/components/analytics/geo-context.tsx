"use client";

import { createContext, useContext } from "react";

interface GeoContextValue {
  /** True if the visitor is in an EU/EEA/UK country. */
  isEU: boolean;
}

const GeoContext = createContext<GeoContextValue>({ isEU: true });

export function useGeo(): GeoContextValue {
  return useContext(GeoContext);
}

export function GeoProvider({
  isEU,
  children,
}: {
  isEU: boolean;
  children: React.ReactNode;
}) {
  return <GeoContext.Provider value={{ isEU }}>{children}</GeoContext.Provider>;
}
