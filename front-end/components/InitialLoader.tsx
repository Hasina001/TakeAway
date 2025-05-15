"use client";
import { useLayoutEffect, useState } from "react";
import Loading from "@/app/Loading";

export default function InitialLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useLayoutEffect(() => {
    // Vérifie si c'est le premier chargement (client-side uniquement)
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("hasLoaded");
      if (!hasLoaded) {
        sessionStorage.setItem("hasLoaded", "true");
        const timer = setTimeout(() => setShowLoader(false), 3000); // Durée ajustable
        return () => clearTimeout(timer);
      } else {
        setShowLoader(false); // Cache immédiatement si déjà chargé
      }
    }
  }, []);

  return showLoader ? <Loading /> : null;
}